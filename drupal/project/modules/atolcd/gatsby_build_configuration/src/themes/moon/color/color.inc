<?php

/**
 * @file
 * Lists available colors and color schemes for the Moon theme.
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
      'title'  => t('Moon (default preset)'),
      'colors' => [
        'a_color_gradients' => [
          'a_dark'   => '#4E5E6E',
          'a_medium' => '#B0B7BF',
          'a_light'  => '#ECEDEF',
        ],
        'b_color_gradients' => [
          'b_dark'  => '#71D6F2',
          'b_light' => '#ECFBFE',
        ],
        'c_color_gradients' => [
          'c_dark'   => '#294672',
          'c_medium' => '#D3DAE4',
        ],
        'd_color_gradients' => [
          'd_dark' => '#1D1E22',
        ],
      ],
    ],
  ],
];
