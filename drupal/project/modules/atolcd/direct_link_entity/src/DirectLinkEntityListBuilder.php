<?php

namespace Drupal\direct_link_entity;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Url;
use Drupal\Core\Link;
use Drupal\file\Entity\File;

/**
 * Defines a class to build a listing of Direct link entity entities.
 *
 * @ingroup direct_link_entity
 */
class DirectLinkEntityListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['name'] = $this->t('Title');
    $header['url'] = $this->t('Url');
    $header['image_direct_link'] = $this->t('Image');
    $header['highlight'] = $this->t('Promoted');
    $header['direct_link_type'] = $this->t('Type');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var \Drupal\direct_link_entity\Entity\DirectLinkEntity $entity */
    // TITLE
    $row['name'] = Link::createFromRoute(
      $entity->label(),
      'entity.direct_link_entity.edit_form',
      ['direct_link_entity' => $entity->id()]
    );
    // URL
    $urlText = $entity->get('url')->value;
    $url = Url::fromUri($urlText);
    $row['url'] = Link::fromTextAndUrl($urlText, $url);
    // IMAGE
    $images = $entity->get("image_direct_link");
    /** @var \Drupal\image\Plugin\Field\FieldType\ImageItem $image */
    $image = $images[0];
    if (!empty($image)) {
      /** @var File $file */
      if ($file = File::load($image->getValue()['target_id'])) {
        $imageArr = array(
          '#theme' => 'image_style',
          '#style_name' => 'thumbnail',
          '#width' => '70',
          '#uri' => $file->getFileUri(),
        );
        $renderer = \Drupal::service('renderer')->render($imageArr);
        $row['image_direct_link'] = $renderer;
      }
    }
    // HIGHLIGHT
    $row['highlight'] = $entity->isPromoted() ? $this->t('Yes') : $this->t('No');
    // TYPE
    /** @var \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem $referenceItem */
    $referenceItem = $entity->get('direct_link_type')[0];
    $typeValue = !empty($referenceItem) ? $referenceItem->entity->name->value : '';
    $row['direct_link_type'] = $typeValue;
    return $row + parent::buildRow($entity);
  }

}
