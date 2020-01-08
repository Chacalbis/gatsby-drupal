<?php

namespace Drupal\direct_link_entity\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Direct link entity entities.
 */
class DirectLinkEntityViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.
    return $data;
  }

}
