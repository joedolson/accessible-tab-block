import { InnerBlocks, RichText } from '@wordpress/block-editor';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import { subscribe } from '@wordpress/data';

registerBlockType( 'tb/tab', {
	title: __( 'Tab', 'tabs-block' ),
	description: __('Holds tabpanel content.', 'tabs-block'),
	supports: {
		html: false,
		customClassName: false,
	},
	icon: {
		foreground: '#555',
		src: 'text',
	},
	parent: ['tb/tabs'],
	category: 'tb-block',
	keywords: [
		__('tab', 'tabs-block'),
		__('tabs', 'tabs-block'),
	],
	attributes: {
		tabLabel: {
			type: 'string',
			default: '',
		},
		blockIndex: {
			type: 'number',
			default: '',
		},
	},
	edit: ({ className, attributes, setAttributes, clientId }) => {
		const { tabLabel, blockIndex } = attributes;

		const parentBlockID = wp.data
			.select('core/block-editor')
			.getBlockParentsByBlockName(clientId, ['tb/tabs']);
		const savedBlockIndex = blockIndex;
		const getBlockIndex = wp.data
			.select('core/block-editor')
			.getBlockOrder(parentBlockID)
			.indexOf(clientId);

		const unsubscribe = subscribe(() => {
			const newBlockIndex = wp.data
				.select('core/block-editor')
				.getBlockOrder(parentBlockID)
				.indexOf(clientId);
			const blockIndexChange = newBlockIndex !== savedBlockIndex;
			if (blockIndexChange) {
				unsubscribe();
				setAttributes({ blockIndex: newBlockIndex });
				wp.data
					.dispatch('core/block-editor')
					.updateBlockAttributes(parentBlockID, {
						updateChild: true,
					});
			}
		});

		const onChangeTabLabel = (newTabLabel) => {
			setAttributes({ tabLabel: newTabLabel });
			setAttributes({ blockIndex: getBlockIndex });
			wp.data
				.dispatch('core/block-editor')
				.updateBlockAttributes(parentBlockID, {
					updateChild: true,
				});
		};
		return (
			<div className={className}>
				<label>{ __( 'Tab Label', 'tabs-block' ) }</label>
				<RichText
					tagName="p"
					className={`tb__tab_label`}
					value={tabLabel}
					onChange={onChangeTabLabel}
					placeholder={ __( 'Tab Label', 'tabs-block' ) }
				/>
				<InnerBlocks
					allowedBlocks={true}
					template={[['core/paragraph']]}
				/>
			</div>
		);
	},
	save: ({ attributes }) => {
		const { tabLabel } = attributes;
		return (
			<div
				className="tb__tab-panel"
				role="tabpanel"
			>
				<InnerBlocks.Content />
			</div>
		);
	},
});
