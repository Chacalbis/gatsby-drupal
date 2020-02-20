<?php

namespace Drupal\gatsby_build_configuration\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;

/**
 * Provides a Configuration Resource
 *
 * @RestResource(
 *   id = "configuration_resource",
 *   label = @Translation("Configuration Resource"),
 *   uri_paths = {
 *     "canonical" = "/jsonapi/conf"
 *   }
 * )
 */
class ConfigurationResource extends ResourceBase {

  /**
   * Responds to GET requests.
   *
   * Returns ResourceResponse
   *
   */
  public function get() {
    $site_config = \Drupal::config('gatsby_build_configuration.siteconfiguration');

    $data = [
      'site_settings'  => [
        'website_name'        => $site_config->get('website_name'),
        'email'               => $site_config->get('email'),
        'alert_message_class' => $site_config->get('alert_message_class'),
        'website_logo'        => $site_config->get('website_logo'),
        'favicon'             => $site_config->get('favicon'),
        'header_banner'       => $site_config->get('header_banner'),
        'facebook_url'        => $site_config->get('facebook_url'),
        'linkedin_url'        => $site_config->get('linkedin_url'),
        'twitter_url'         => $site_config->get('twitter_url'),
        'instagram_url'       => $site_config->get('instagram_url'),
        'youtube_url'         => $site_config->get('youtube_url'),
      ],
    ];
    $response = new ResourceResponse($data);
    // In order to generate fresh result every time (without clearing
    // the cache), you need to invalidate the cache.
    $response->addCacheableDependency($data);
    return $response;
  }

}