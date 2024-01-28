/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	TextControl,
} from '@wordpress/components';
const { Fragment } = wp.element;
import { useSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = ['tb/tab'];

import './tab';

// editor style.
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		tabLabelsArray,
		updateChild,
		customClass,
		anchorId,
	} = attributes;

	const buildTabLabelsArray = () => {
		const parentBlockID = clientId;
		const { innerBlockCount } = useSelect((select) => ({
				innerBlockCount: select('core/block-editor').getBlockCount(parentBlockID),
			})
		);

		const tabLabels = [];

		for (let block = 0; block < innerBlockCount; block++) {
			const tabLabel = wp.data
				.select('core/block-editor')
				.getBlocks(parentBlockID)[block].attributes.tabLabel;
			tabLabels.push(tabLabel);
		}

		return tabLabels;
	};

	const labelsArray = buildTabLabelsArray();
	const labelLengthChange = labelsArray.length !== tabLabelsArray.length;

	if ( labelLengthChange || updateChild ) {
		setAttributes({ tabLabelsArray: labelsArray });
		setAttributes({ updateChild: false });
	}

	return (
		<Fragment>
			<InspectorControls>
				<TabPanel
					className="tb__tabs"
					activeClass="active_tab"
					initialTabName={'tb__advanced'}
					tabs={[
						{
							name: 'tb__advanced',
							title: __( 'Settings', 'tabs-block' ),
							className: 'tb__tab',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'tb__advanced') {
							return (
								<Fragment>
									<PanelBody
										title={__(
											'Miscellaneous',
											'tab-blocks'
										)}
										initialOpen={true}
									>
										<TextControl
											label={__(
												'HTML Anchor ID',
												'tab-blocks'
											)}
											value={anchorId}
											onChange={(className) =>
												setAttributes({
													anchorId: className.replace(
														/[^a-zA-Z0-9_-]/g,
														'-'
													),
												})
											}
											help={__(
												'Anchor ID lets you link directly to a section on a page.',
												'tab-blocks'
											)}
										/>
										<TextControl
											label={__(
												'Additional Class(es)',
												'tab-block'
											)}
											value={customClass}
											onChange={(className) =>
												setAttributes({
													customClass: className,
												})
											}
											help={__(
												'Use space to separate multiple classes.',
												'tab-block'
											)}
										/>
									</PanelBody>
								</Fragment>
							);
						}
					}}
				</TabPanel>
			</InspectorControls>

			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={[['tb/tab']]}
				renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
			/>
		</Fragment>
	);
}
