<?php
/**
 * Tabs Callback
 */
function tabs_callback( $attributes ) {
	$handle = 'tb__tabs_' . $attributes['uniqueId'];
	$tb_css = '
	/**
	 * Normal CSS
	 */
	.tb__tab-label {
		all: unset;
	}
	.tb__tab-labels {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
	}
	.tb__tab-label {
		padding: .25rem .5rem;
		border-radius: 3px 3px 0 0;
		border: 1px solid;
		border-bottom: none;
		position: relative;
		bottom: -1px;
	}
	.tb__tab-label[aria-selected="true"] {
		font-weight: 700;
		background: #fff;
		color: #333;
	}
	.tb__tab-content {
		border: 1px solid;
		padding: .5rem;
	
	.tb__tab-label:hover {
		text-decoration: underline;
	}
	.tb__tab-label:focus {
		background: #333;
		color: #fff;
		border-color: #333;
	}';

	return $tb_css;
}