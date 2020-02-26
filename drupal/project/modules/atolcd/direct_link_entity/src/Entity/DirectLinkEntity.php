<?php

namespace Drupal\direct_link_entity\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityPublishedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the Direct link entity.
 *
 * @ingroup direct_link_entity
 *
 * @ContentEntityType(
 *   id = "direct_link_entity",
 *   label = @Translation("Direct link entity"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\direct_link_entity\DirectLinkEntityListBuilder",
 *     "views_data" = "Drupal\direct_link_entity\Entity\DirectLinkEntityViewsData",
 *     "translation" = "Drupal\direct_link_entity\DirectLinkEntityTranslationHandler",
 *
 *     "form" = {
 *       "default" = "Drupal\direct_link_entity\Form\DirectLinkEntityForm",
 *       "add" = "Drupal\direct_link_entity\Form\DirectLinkEntityForm",
 *       "edit" = "Drupal\direct_link_entity\Form\DirectLinkEntityForm",
 *       "delete" = "Drupal\direct_link_entity\Form\DirectLinkEntityDeleteForm",
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\direct_link_entity\DirectLinkEntityHtmlRouteProvider",
 *     },
 *     "access" = "Drupal\direct_link_entity\DirectLinkEntityAccessControlHandler",
 *   },
 *   base_table = "direct_link_entity",
 *   data_table = "direct_link_entity_field_data",
 *   translatable = TRUE,
 *   admin_permission = "administer direct link entity entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "name",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *     "published" = "status",
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/direct_link_entity/{direct_link_entity}",
 *     "add-form" = "/admin/structure/direct_link_entity/add",
 *     "edit-form" = "/admin/structure/direct_link_entity/{direct_link_entity}/edit",
 *     "delete-form" = "/admin/structure/direct_link_entity/{direct_link_entity}/delete",
 *     "collection" = "/admin/structure/direct_link_entity",
 *   },
 * )
 */
class DirectLinkEntity extends ContentEntityBase implements DirectLinkEntityInterface {

  use EntityChangedTrait;
  use EntityPublishedTrait;

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return $this->get('name')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function isPromoted() {
    return $this->get('highlight')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    // Add the published field.
    $fields += static::publishedBaseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Title'))
      ->setDescription(t('The title of the direct link entity.'))
      ->setTranslatable(TRUE)
      ->setSettings([
        'max_length' => 50,
        'text_processing' => 0,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['url'] = BaseFieldDefinition::create('uri')
      ->setLabel(t('Direct link url'))
      ->setDescription(t('The url of the direct link entity.'))
      ->setTranslatable(TRUE)
      ->setSettings(['max_length' => 255])
      ->setDisplayOptions('form', [
        'type' => 'uri',
        'weight' => -3,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setRequired(TRUE);

    $fields['image_direct_link'] = BaseFieldDefinition::create('image')
      ->setLabel(t('Direct link image'))
      ->setDescription(t('The image of the direct link entity.'))
      ->setTranslatable(TRUE)
      ->setSettings([
        'file_directory' => 'direct-links',
        'alt_field_required' => FALSE,
        'file_extensions' => 'png jpg jpeg svg',
      ])
      ->setDisplayOptions('view', array(
        'label' => 'hidden',
        'type' => 'default',
        'weight' => -2,
      ))
      ->setDisplayOptions('form', array(
        'label' => 'hidden',
        'type' => 'image_image',
        'weight' => -2,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['highlight'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('Promoted'))
      ->setDescription(t('Whether or not the entity is promoted on homepage.'))
      ->setTranslatable(TRUE)
      ->setDisplayOptions('form', array(
        'type' => 'boolean_checkbox',
        'settings' => array(
          'display_label' => TRUE,
        ),
        'weight' => -1,
      ))
      ->setDisplayConfigurable('form', TRUE);

    $fields['direct_link_type'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Direct link type'))
      ->setDescription(t('Which type of direct link (Direct Access or Partner).'))
      ->setTranslatable(TRUE)
      ->setSetting('target_type', 'taxonomy_term')
      ->setSetting('handler_settings',
        array(
          'target_bundles' => array(
            'type_de_lien_direct' => 'type_de_lien_direct'
          )))
      ->setDisplayOptions('view', array(
        'label' => 'hidden',
        'type' => 'author',
        'weight' => 0,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'options_select',
        'settings' => array(
          'display_label' => TRUE,
        ),
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);


    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }

}
