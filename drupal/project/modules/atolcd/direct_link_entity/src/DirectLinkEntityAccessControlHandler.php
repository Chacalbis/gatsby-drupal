<?php

namespace Drupal\direct_link_entity;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Direct link entity.
 *
 * @see \Drupal\direct_link_entity\Entity\DirectLinkEntity.
 */
class DirectLinkEntityAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\direct_link_entity\Entity\DirectLinkEntityInterface $entity */

    switch ($operation) {

      case 'view':

        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished direct link entity entities');
        }


        return AccessResult::allowedIfHasPermission($account, 'view published direct link entity entities');

      case 'update':

        return AccessResult::allowedIfHasPermission($account, 'edit direct link entity entities');

      case 'delete':

        return AccessResult::allowedIfHasPermission($account, 'delete direct link entity entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add direct link entity entities');
  }


}
