<?php
/**
 * Plugin Name:       Tabs Block
 * Description:       A custom Gutenberg Block to show content in tabs style.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.2
 * Author:            Joe Dolson
 * Author URI:        https://www.joedolson.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tabs-block
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [tb] && [TB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */
final class TB_BLOCKS_CLASS {
	public function __construct() {

		// define constants
		$this->tb_define_constants();

		// block initialization
		add_action( 'init', [ $this, 'tb_blocks_init' ] );

		// blocks category
		if( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
			add_filter( 'block_categories', [ $this, 'tb_register_block_category' ], 10, 2 );
		} else {
			add_filter( 'block_categories_all', [ $this, 'tb_register_block_category' ], 10, 2 );
		}

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'tb_external_libraries' ] );
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function tb_define_constants() {
		if ( SCRIPT_DEBUG ) {
			define( 'TB_VERSION', time() );
		} else {
			define( 'TB_VERSION', '1.0.0' );
		}
		define( 'TB_URL', plugin_dir_url( __FILE__ ) );
		define( 'TB_LIB_URL', TB_URL . 'lib/' );
	}

	/**
	 * Blocks Registration 
	 */

	public function tb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/blocks/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function tb_blocks_init() {
		// register single block.
		$this->tb_register_block( 'tabs', array(
			'render_callback' => array( $this, 'tb_render_block' ),
		) );
	}

	// inline css.
	public function tb_inline_css( $handle, $css ){
		// register inline style.
		wp_register_style( $handle, false );
		// enqueue inline style.
		wp_enqueue_style( $handle );
		// add inline style at head.
		wp_add_inline_style( $handle, $css );
	}

	// render function.
	public function tb_render_block( $attributes, $content ) {
		require_once __DIR__ . '/templates/tabs.php';
		$handle = 'tb-accessible-tabs';
		$this->tb_inline_css( $handle, tabs_callback( $attributes ) );
		return $content;
	}

	/**
	 * Register Block Category
	 */
	public function tb_register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'tb-block',
					'title' => __( 'Tabs Block', 'tabs-block' ),
				),
			),
			$categories,
		);
	}

	/**
	 * Enqueue Block Assets
	 */
	public function tb_external_libraries() {
		// enqueue JS
		if( ! is_admin() && has_block( 'tb/tabs' ) ){
			wp_enqueue_script( 'tb-tabs', TB_LIB_URL . 'js/tabs.js', array(), TB_VERSION, true );
		}
	}

}

TB_BLOCKS_CLASS::init();
