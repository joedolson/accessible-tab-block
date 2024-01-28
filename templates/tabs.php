<?php
/**
 * Tabs Callback
 *
 * @param array $attributes Block attributes.
 */
function tabs_callback( $attributes ) {
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
		background: transparent;
		color: #1d2327;
	}
	.tb__tab-label:focus,
	.tb__tab-label:hover,
	.tb__tab-label[aria-selected="true"] {
		font-weight: 700;
		color: #1d2327;
		background: #fff;
	}
	.tb__tab-content {
		border: 1px solid;
		padding: 1rem;
		background: #fff;
		color: #1d2327;
	}';

	return $tb_css;
}