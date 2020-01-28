<?php
// Project configuration

$config_directories = [];
global $content_directories;
$content_directories['sync'] = 'content-sync';

$settings['hash_salt'] = getenv('DRUPAL_HASH_SALT');

$settings['update_free_access'] = getenv('ENVIRONMENT') === 'dev';

$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';

$settings['file_scan_ignore_directories'] = [
    'node_modules',
    'bower_components',
];

$settings['entity_update_batch_size'] = 50;

$settings['entity_update_backup'] = true;

$databases['default']['default'] = [
    'database' => getenv('POSTGRES_NAME'),
    'username' => getenv('POSTGRES_USER'),
    'password' => getenv('POSTGRES_PASSWORD'),
    'prefix' => '',
    'host' => getenv('POSTGRES_HOST'),
    'port' => getenv('POSTGRES_PORT'),
    'namespace' => 'Drupal\\Core\\Database\\Driver\\pgsql',
    'driver' => 'pgsql',
];

$settings['trusted_host_patterns'] = explode('§', getenv('DRUPAL_TRUSTED_HOST'));

if (!empty(getenv('TERNUM_PROXY_HOST'))
    && !empty(getenv('TERNUM_PROXY_PORT'))
) {
    $settings['http_proxy'] = [
        "host" => getenv('TERNUM_PROXY_HOST'),
        "port" => getenv('TERNUM_PROXY_PORT'),
    ];
} else {
    $settings['http_proxy'] = null;
}

$settings['disable_check_client_ip_socle'] = getenv('DISABLE_IP_CHECK_SOCLE') === 'true';

$envAllowedIp = getenv('IP_CHECK_SOCLE');
if (!empty($envAllowedIp)) {
  $settings['allowed_ips'] = explode('|', $envAllowedIp);
}
else {
  $settings['allowed_ips'] = [
    '162.92.107.49', // Prod
    '160.92.107.25', // Qualif / Préprod
  ];
}

$settings['url_socle'] = getenv('WL_URL_SOCLE');

$reverseProxyIps = getenv('REVERSE_PROXY_IPS');
if (!empty($reverseProxyIps)) {
  $settings['reverse_proxy'] = TRUE;
  $settings['reverse_proxy_addresses'] = explode('|', $reverseProxyIps);
  $settings['reverse_proxy_trusted_headers']
    = \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_FOR
    | \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_PROTO
    | \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_PORT
    | \Symfony\Component\HttpFoundation\Request::HEADER_X_FORWARDED_HOST;
}

switch (getenv('ENVIRONMENT')) {
  case 'qualif':
    $config_directories['sync'] = 'config-sync-qualif';
    break;
  case 'preprod':
    $config_directories['sync'] = 'config-sync-preprod';
    break;
  case 'prod':
    $config_directories['sync'] = 'config-sync-prod';
    break;
  default:
    $config_directories['sync'] = 'config-sync';
}

// Bellow you have composer settings DO NOT REMOVE LAST LINE
