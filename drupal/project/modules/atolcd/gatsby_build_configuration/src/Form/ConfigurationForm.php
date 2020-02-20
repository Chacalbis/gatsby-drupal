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

    return parent::buildForm($form, $form_state);
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

    parent::submitForm($form, $form_state);
  }

}
