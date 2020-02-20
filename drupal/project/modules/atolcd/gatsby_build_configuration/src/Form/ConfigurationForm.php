<?php

namespace Drupal\gatsby_build_configuration\Form;

use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ConfigurationForm.
 */
class ConfigurationForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'gatsby_build_configuration.siteconfiguration',
      'gatsby_build_configuration.themeconfiguration',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'site_configuration_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $site_config = $this->config('gatsby_build_configuration.siteconfiguration');
    $theme_config = $this->config('gatsby_build_configuration.themeconfiguration');

    /*======================================================================
      SITE
    ======================================================================*/
    $form['advanced'] = [
      '#type'  => 'vertical_tabs',
      '#title' => t('Settings'),
    ];

    $form['site'] = [
      '#type'               => 'details',
      '#title'              => $this->t('Website settings'),
      '#group'              => 'advanced',
      'website_name'        => [
        '#type'          => 'textfield',
        '#title'         => $this->t('Website name'),
        '#description'   => $this->t('Enter the name of the website (32 characters max.)'),
        '#maxlength'     => 32,
        '#size'          => 32,
        '#default_value' => $site_config->get('website_name'),
      ],
      'email'               => [
        '#type'          => 'email',
        '#title'         => $this->t('Site email address'),
        '#description'   => $this->t("The <em>From</em> address in automated emails sent during registration and new password requests, and other notifications. (Use an address ending in your site's domain to help prevent this email being flagged as spam.)"),
        '#default_value' => $site_config->get('email'),
      ],
      'alert_message_class' => [
        '#type'          => 'textfield',
        '#title'         => $this->t('Alert message class'),
        '#description'   => $this->t('Choose a bootstrap class available at this <a href=":bootstrap">address</a>',
          [':bootstrap' => 'https://getbootstrap.com/docs/4.0/components/alerts/']),
        '#maxlength'     => 16,
        '#size'          => 16,
        '#default_value' => $site_config->get('alert_message_class'),
      ],
      'website_logo'        => [
        '#type'              => 'managed_file',
        '#title'             => $this->t('Website logo'),
        '#description'       => $this->t('This logo will be displayed both in header and footer. Allowed extensions: png jpg jpeg svg'),
        '#default_value'     => !empty($site_config->get('website_logo')) ? [$site_config->get('website_logo')['fid']] : [],
        '#upload_location'   => 'public://conf-images',
        '#upload_validators' => [
          'file_validate_extensions' => ['png jpg jpeg svg'],
        ],
      ],
      'favicon'             => [
        '#type'              => 'managed_file',
        '#title'             => $this->t('Favicon'),
        '#description'       => $this->t('Allowed extensions: png ico'),
        '#default_value'     => !empty($site_config->get('favicon')) ? [$site_config->get('favicon')['fid']] : [],
        '#upload_location'   => 'public://conf-images',
        '#upload_validators' => [
          'file_validate_extensions' => ['png ico'],
        ],
      ],
      'header_banner'       => [
        '#type'              => 'managed_file',
        '#title'             => $this->t('Header banner'),
        '#description'       => $this->t('Image that will be displayed at the top of the page. Allowed extensions: png jpg jpeg svg'),
        '#default_value'     => !empty($site_config->get('header_banner')) ? [$site_config->get('header_banner')['fid']] : [],
        '#upload_location'   => 'public://conf-images',
        '#upload_validators' => [
          'file_validate_extensions' => ['png jpg jpeg svg'],
          'file_validate_size'       => [25600000],
        ],
      ],
      'facebook_url'        => [
        '#type'          => 'url',
        '#title'         => $this->t('Facebook'),
        '#default_value' => $site_config->get('facebook_url'),
      ],
      'linkedin_url'        => [
        '#type'          => 'url',
        '#title'         => $this->t('Linkedin'),
        '#default_value' => $site_config->get('linkedin_url'),
      ],
      'twitter_url'         => [
        '#type'          => 'url',
        '#title'         => $this->t('Twitter'),
        '#default_value' => $site_config->get('twitter_url'),
      ],
      'instagram_url'       => [
        '#type'          => 'url',
        '#title'         => $this->t('Instagram'),
        '#default_value' => $site_config->get('instagram_url'),
      ],
      'youtube_url'         => [
        '#type'          => 'url',
        '#title'         => $this->t('Youtube'),
        '#default_value' => $site_config->get('youtube_url'),
      ],
    ];

    /*======================================================================
     THEME
    ======================================================================*/

    // Define wrappers id to populate new content into.
    $presets_wrapper = 'presets-wrapper';
    $palette_wrapper = 'palette-wrapper';

    $form['theme'] = [
      '#type'  => 'details',
      '#title' => $this->t('Theme settings'),
      '#group' => 'advanced',
    ];
    // Default theme name or get from config
    $theme_name = 'moon';
    $config_data = [];
    foreach ($this->listThemesData() as $name => $data) {
      if (!empty($theme_config->get($name))) {
        $config_data[$name] = [
          'selected' => $theme_config->get($name)['selected'],
          'preset'   => $theme_config->get($name)['preset'],
          'palette'  => $theme_config->get($name)['palette'],
        ];
        if ($config_data[$name]['selected']) {
          $theme_name = $name;
        }
      }
    }
    $preset_name = 'default';
    $palette = [];

    // Theme select
    $form['theme']['theme_select'] = [
      '#type'          => 'radios',
      '#title'         => $this->t('Theme selection :'),
      '#default_value' => $theme_name,
      '#options'       => array_map(function ($theme_data) {
        $url = $theme_data['screenshot'];
        $imageArr = [
          '#theme' => 'image',
          '#width' => '200',
          '#uri'   => $url,
        ];
        return \Drupal::service('renderer')->render($imageArr) . '<span>'. $theme_data["name"]. '</span>';
      }, $this->listThemesData()),
      // The #ajax attribute used in the theme_select input element defines an ajax
      // callback that will invoke the 'updatePresets' method on this form object.
      // Whenever the theme element changes, it will invoke this callback
      // and replace the contents of the 'presets_wrapper' container with the
      // results of this method call.
      '#ajax'          => [
        'callback' => [$this, 'updatePresets'],
        'event'    => 'change',
        'wrapper'  => $presets_wrapper,
        'progress' => [],
      ],
    ];

    // Add wrapper that can be replaced with new HTML by the ajax callback updatePresets().
    $form['theme']['presets_wrapper'] = [
      '#type'       => 'container',
      '#attributes' => ['id' => $presets_wrapper],
    ];

    // Get the form values and raw input (unvalidated values).
    $form_state_values = $form_state->getValues();

    // When landing on form page
    if (empty($form_state_values)) {
      foreach ($config_data as $name => $data) {
        if ($data['selected']) {
          $theme_name = $name;
          $preset_name = $data['preset'];
          $palette = $data['palette'];
          break;
        }
      }
    }
    else {
      $theme_name = $form_state_values['theme_select'];
      $preset_name = $form_state_values['preset'];
      if ($preset_name === 'default') {
        $palette = $this->color_get_palette($theme_name, TRUE);
      }
      else {
        if (!empty($config_data)) {
          $palette = $config_data[$theme_name]['palette'];
        }
      }
    }
    $info = $this->color_get_info($theme_name);
    $info['presets']['custom'] = ['title' => t('Custom'), 'colors' => []];
    $color_sets = [];
    foreach ($info['presets'] as $key => $preset) {
      $color_sets[$key] = $preset['title'];
    }

    if (empty($palette)) {
      $palette = $this->color_get_palette($theme_name, TRUE);;
    }

    $form['theme']['presets_wrapper']['preset'] = [
      '#type'          => 'select',
      '#title'         => $this->t('Color presets :'),
      '#default_value' => $preset_name,
      '#options'       => $color_sets,
      '#ajax'          => [
        'callback' => [$this, 'updatePalette'],
        'event'    => 'change',
        'wrapper'  => $palette_wrapper,
      ],
    ];
    $form['theme']['presets_wrapper']['palette_wrapper'] = [
      '#type'       => 'container',
      '#attributes' => ['id' => $palette_wrapper],
    ];

    $names = $info['fields'];

    foreach ($palette as $gradient => $values) {
      if (isset($names[$gradient])) {
        $form['theme']['presets_wrapper']['palette_wrapper'][$gradient] = [
          '#type'  => 'details',
          '#title' => $names[$gradient],
          '#open'  => TRUE,
        ];
        foreach ($values as $color_type => $color) {
          $form['theme']['presets_wrapper']['palette_wrapper'][$gradient][$color_type] = [
            '#type'       => 'color',
            '#value'      => $color,
            '#attributes' => ['disabled' => 'disabled'],
          ];
          // ONLY LOADED IN AJAX RESPONSE OR IF FORM STATE VALUES POPULATED.
          if ((!empty($form_state_values) && $form_state_values['preset'] === 'custom') || $preset_name === 'custom') {
            $form['theme']['presets_wrapper']['palette_wrapper'][$gradient][$color_type]['#attributes'] = [];
          }
        }
      }
    }
    // Attaching a library to the form
    $form['#attached']['library'][] = 'gatsby_build_configuration/admin';

    return parent::buildForm($form, $form_state);
  }

  /**
   * Ajax callback for the presets dropdown.
   */
  public function updatePresets(array $form, FormStateInterface $form_state) {
    return $form['theme']['presets_wrapper'];
  }

  /**
   * Ajax callback for the palette wrapper.
   */
  public function updatePalette(array $form, FormStateInterface $form_state) {
    return $form['theme']['presets_wrapper']['palette_wrapper'];
  }


  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $site_fields = [
      'website_name',
      'email',
      'alert_message_class',
      'facebook_url',
      'linkedin_url',
      'twitter_url',
      'instagram_url',
      'youtube_url',
    ];

    try {
      $storage = \Drupal::entityTypeManager()->getStorage('file');
    } catch (InvalidPluginDefinitionException $e) {
    } catch (PluginNotFoundException $e) {
    }

    $site_config = $this->config('gatsby_build_configuration.siteconfiguration');
    foreach ($site_fields as $field_name) {
      $site_config->set($field_name, $form_state->getValue($field_name));
    }
    foreach ([
               'website_logo',
               'favicon',
               'header_banner',
             ] as $image_field_name) {
      if (!empty($form_state->getValue($image_field_name))) {
        $fileArr = $storage->load($form_state->getValue($image_field_name)[0]);
        $site_config->set($image_field_name,
          [
            'fid' => $fileArr->get('fid')->value,
            'uri' => $fileArr->get('uri')->value,
          ]);
      }
    }
    $site_config->save();

    $theme_config = $this->config('gatsby_build_configuration.themeconfiguration');
    $selected_theme = $form_state->getValue('theme_select');
    // Set other themes' selected field to false
    foreach ($this->listThemesData() as $theme_name => $theme_data) {
      if ($theme_name !== $selected_theme && !empty($not_selected_theme_data = $theme_config->get($theme_name))) {
        $not_selected_theme_data['selected'] = FALSE;
        $theme_config->set($theme_name, $not_selected_theme_data)->save();
      }
    }
    $preset = $form_state->getValue('preset');
    $palette = [];
    $gradients_allowed = [
      'a_color_gradients',
      'b_color_gradients',
      'c_color_gradients',
      'd_color_gradients',
    ];
    $user_input = $form_state->getUserInput();
    $color_types_allowed = ['dark', 'medium', 'light'];
    $filtered_gradients = array_filter(
      $form['theme']['presets_wrapper']['palette_wrapper'],
      function ($key) use ($gradients_allowed) {
        return in_array($key, $gradients_allowed);
      },
      ARRAY_FILTER_USE_KEY
    );
    foreach ($filtered_gradients as $gradient_machine_name => $colors) {
      $filtered_colors = array_filter(
        $colors,
        function ($key) use ($color_types_allowed) {
          return in_array(substr($key, 2), $color_types_allowed);
        },
        ARRAY_FILTER_USE_KEY
      );
      foreach ($filtered_colors as $color_type => $color_data) {
        $palette[$gradient_machine_name][$color_type] = $user_input['preset'] === 'default' ? $color_data['#value'] : $user_input[$color_type];
      }
    }
    $theme_data = [
      'selected' => TRUE,
      'theme'    => $selected_theme,
      'preset'   => $preset,
      'palette'  => $palette,
    ];
    $theme_config->set($selected_theme, $theme_data)->save();

    parent::submitForm($form, $form_state);
  }

  /**
   * Return an array listing data about themes used in this project and their
   * presets
   */
  protected function listThemesData() {
    $module_path = drupal_get_path('module', 'gatsby_build_configuration');
    return [
      'moon'   => [
        'name'       => $this->t('Moon'),
        'screenshot' => '/' . $module_path . '/src/themes/moon/screenshot.jpg',
      ],
      'cactus' => [
        'name'       => $this->t('Cactus'),
        'screenshot' => '/' . $module_path . '/src/themes/cactus/screenshot.jpg',
      ],
    ];
  }


  /**
   * Retrieves the Color module information for a specific theme.
   */
  function color_get_info($theme) {
    static $theme_info = [];

    if (isset($theme_info[$theme])) {
      return $theme_info[$theme];
    }
    $info = [];
    $module_path = drupal_get_path('module', 'gatsby_build_configuration');
    $file = \Drupal::root() . '/' . $module_path . '/src/themes/' . $theme . '/color/color.inc';
    if (file_exists($file)) {
      include $file;
      // Add in default values.
      $info += [
        // CSS files (excluding @import) to rewrite with new color preset.
        'css'  => [],
        // Files to copy.
        'copy' => [],
      ];
      $theme_info[$theme] = $info;
      return $info;
    }
  }

  /**
   * Retrieves the color palette for a specific theme.
   */
  function color_get_palette($theme, $default = FALSE) {
    // Fetch and expand default palette.
    // @todo Default color config should be moved to yaml.
    // Yaml::decode(file_get_contents($path))
    $info = $this->color_get_info($theme);
    $palette = $info['presets']['default']['colors'];

    if ($default) {
      return $palette;
    }

    // Load variable.
    return \Drupal::configFactory()
                  ->getEditable('gatsby_build_configuration.themeconfiguration')
                  ->get('palette') ?: $palette;
  }

}
