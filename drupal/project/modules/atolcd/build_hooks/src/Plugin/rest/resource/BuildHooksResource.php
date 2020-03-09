<?php

namespace Drupal\build_hooks\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;

/**
 * Provides a Configuration Resource
 *
 * @RestResource(
 *   id = "build_hooks_resource",
 *   label = @Translation("Build Hooks Resource"),
 *   uri_paths = {
 *     "canonical" = "/build_hooks"
 *   }
 * )
 */
class BuildHooksResource extends ResourceBase {

  /**
   * Responds to GET requests.
   *
   * Returns ResourceResponse
   *
   */
  public function get() {

    $data = [];
    $response = new ResourceResponse($data);
    // In order to generate fresh result every time (without clearing
    // the cache), you need to invalidate the cache.
    $response->addCacheableDependency($data);
    return $response;
  }
}