<?php

namespace Drupal\direct_link_entity\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;

/**
 * Provides an interface for defining Direct link entity entities.
 *
 * @ingroup direct_link_entity
 */
interface DirectLinkEntityInterface extends ContentEntityInterface, EntityChangedInterface, EntityPublishedInterface {

  /**
   * Add get/set methods for your configuration properties here.
   */

  /**
   * Gets the Direct link entity name.
   *
   * @return string
   *   Name of the Direct link entity.
   */
  public function getName();

  /**
   * Sets the Direct link entity name.
   *
   * @param string $name
   *   The Direct link entity name.
   *
   * @return \Drupal\direct_link_entity\Entity\DirectLinkEntityInterface
   *   The called Direct link entity.
   */
  public function setName($name);

  /**
   * Check if the Direct link entity is promoted on front page
   *
   * @return int
   *   Value of the Direct link entity promoted field.
   */
  public function isPromoted();

  /**
   * Gets the Direct link entity creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Direct link entity.
   */
  public function getCreatedTime();

  /**
   * Sets the Direct link entity creation timestamp.
   *
   * @param int $timestamp
   *   The Direct link entity creation timestamp.
   *
   * @return \Drupal\direct_link_entity\Entity\DirectLinkEntityInterface
   *   The called Direct link entity.
   */
  public function setCreatedTime($timestamp);

}
