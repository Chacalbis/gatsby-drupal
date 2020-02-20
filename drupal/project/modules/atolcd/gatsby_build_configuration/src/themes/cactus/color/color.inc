<?php

/**
 * @file
 * Lists available colors and color schemes for the Cactus theme.
 */

$info = [
  // Available colors and color labels used in theme.
  'fields'  => [
    'a_color_gradients' => t('Main colors'),
    'b_color_gradients' => t('Colorful details'),
    'c_color_gradients' => t('Colorful fonts'),
    'd_color_gradients' => t('Footer'),
  ],
  // Pre-defined color presets.
  'presets' => [
    'default' => [
      'title'  => t('Cactus (default preset)'),
      'colors' => [
        'a_color_gradients' => [
          'a_dark'   => '#5BB772',
          'a_medium' => '#ECEDEF',
          'a_light'  => '#FFFFFF',
        ],
        'b_color_gradients' => [
          'b_dark'  => '#E35959',
          'b_light' => '#FFFEFF',
        ],
        'c_color_gradients' => [
          'c_dark'   => '#F28E2D',
          'c_medium' => '#F5F1EE',
        ],
        'd_color_gradients' => [
          'd_dark' => '#1D1E22',
        ],
      ],
    ],
  ],
];
