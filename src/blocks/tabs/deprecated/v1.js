import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
const { RawHTML } = wp.element;

const v1 = {
	attributes: {
		uniqueId: {
			type: 'string',
		},
		tabLabelsArray: {
			type: 'array',
			default: [],
		},
		updateChild: {
			type: 'boolean',
			default: false,
		},
		sideTabLayout: {
			type: 'boolean',
			default: false,
		},
		tabsContainerBg: {
			type: 'string',
			default: '#ffffff',
		},
		borderColor: {
			type: 'string',
			default: '#e1e1e1',
		},
		activeTabColor: {
			type: 'string',
			default: '#ffa500',
		},
	},
	migrate: (attributes) => {
		return {
			...attributes,
			tabsContentBg: attributes.tabsContainerBg,
			containerBorderColor: attributes.borderColor,
			separatorColor: attributes.borderColor,
			labelsSeparatorColor: attributes.borderColor,
			tabLayout: 'horizontal',
			containerBorderStyle: 'solid',
			containerTopBorderWidth: '1',
			containerRightBorderWidth: '1',
			containerBottomBorderWidth: '1',
			containerLeftBorderWidth: '1',
			enableContainerLinkedBorder: true,
			containerLinkedBorderWidth: '1',
			containerTopBorderRadius: '1',
			containerRightBorderRadius: '1',
			containerBottomBorderRadius: '1',
			containerLeftBorderRadius: '1',
			enableContainerLinkedBorderRadius: true,
			containerLinkedBorderRadius: '1',
			enableContainerBoxShadow: false,
			showSeparator: true,
			separatorStyle: 'solid',
			separatorHeight: 1,
			labelsPosition: 'left',
			labelsDeskPaddingTop: '10',
			labelsDeskPaddingBottom: '10',
			labelsDeskPaddingLeft: '10',
			labelsDeskPaddingRight: '10',
			enableLinkedDeskPadding: true,
			labelsLinkedDeskPadding: '10',
			labelsTabPaddingTop: '10',
			labelsTabPaddingBottom: '10',
			labelsTabPaddingLeft: '10',
			labelsTabPaddingRight: '10',
			enableLinkedTabPadding: true,
			labelsLinkedTabPadding: '10',
			labelsMobPaddingTop: '10',
			labelsMobPaddingBottom: '10',
			labelsMobPaddingLeft: '10',
			labelsMobPaddingRight: '10',
			enableLinkedMobPadding: true,
			labelsLinkedMobPadding: '10',
			addLabelsSeparator: true,
			labelsSeparatorStyle: 'solid',
			labelsSeparatorWidth: 1,
			tabsContentDeskPaddingTop: '10',
			tabsContentDeskPaddingBottom: '10',
			tabsContentDeskPaddingLeft: '10',
			tabsContentDeskPaddingRight: '10',
			enableLinkedContentDeskPadding: true,
			tabsContentLinkedDeskPadding: '10',
			tabsContentTabPaddingTop: '10',
			tabsContentTabPaddingBottom: '10',
			tabsContentTabPaddingLeft: '10',
			tabsContentTabPaddingRight: '10',
			enableLinkedContentTabPadding: true,
			tabsContentLinkedTabPadding: '10',
			tabsContentMobPaddingTop: '10',
			tabsContentMobPaddingBottom: '10',
			tabsContentMobPaddingLeft: '10',
			tabsContentMobPaddingRight: '10',
			enableLinkedContentMobPadding: true,
			tabsContentLinkedMobPadding: '10',
			useCustomColors: true,
			activeTabColor: '#44677A',
			makeActiveTabSeparateLess: true,
		};
	},
	save: ({ attributes }) => {
		const {
			tabLabelsArray,
			sideTabLayout,
			tabsContainerBg,
			borderColor,
			uniqueId,
		} = attributes;
		let blockProps = useBlockProps.save({
			className: `tb__tabs_${uniqueId}`,
		});
		if (sideTabLayout) {
			blockProps = useBlockProps.save({
				className: `side-tab-layout tb__tabs_${uniqueId}`,
			});
		}
		return (
			<div
				{...blockProps}
				style={{
					border: `1px solid ${borderColor}`,
					backgroundColor: tabsContainerBg,
				}}
			>
				<ul
					className="tb__tab-labels"
					role="tablist"
					aria-label="tabbed content"
					style={{
						borderBottom: sideTabLayout
							? 'none'
							: `1px solid ${borderColor}`,
					}}
				>
					{tabLabelsArray.map((label, i) => {
						return (
							<li
								key={i}
								className={
									i === 0
										? 'tb__tab-label active'
										: 'tb__tab-label'
								}
								role="tab"
								aria-selected={i === 0 ? 'true' : 'false'}
								aria-controls={label}
								tabIndex="0"
								style={{
									borderRight:
										sideTabLayout === false &&
										`1px solid ${borderColor}`,
									borderBottom:
										sideTabLayout &&
										`1px solid ${borderColor}`,
								}}
							>
								<RawHTML>{label}</RawHTML>
							</li>
						);
					})}
				</ul>
				<div className="tb__tab-content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export default v1;
