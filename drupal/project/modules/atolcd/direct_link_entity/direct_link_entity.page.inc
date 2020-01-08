<?php

/**
 * @file
 * Contains direct_link_entity.page.inc.
 *
 * Page callback for Direct link entity entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Direct link entity templates.
 *
 * Default template: direct_link_entity.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_direct_link_entity(array &$variables) {
  // Fetch DirectLinkEntity Object.
  $direct_link_entity = $variables['elements']['#direct_link_entity'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
