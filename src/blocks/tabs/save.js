// import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
const { RawHTML } = wp.element;

export default function save({ attributes }) {
	const {
		tabLabelsArray,
		uniqueId,
		customClass,
		anchorId,
	} = attributes;
	const blockProps = useBlockProps.save({
		className: `tb__tabs_${uniqueId}`,
	});
	return (
		<div {...blockProps} id={anchorId ? anchorId : null}>
			<ul
				className={`tb__tab-labels`}
				role="tablist"
			>
				{tabLabelsArray.map((label, i) => {
					return (
						<li key={i}><button
							className={
								i === 0
									? 'tb__tab-label active'
									: 'tb__tab-label'
							}
							role="tab"
							aria-selected={i === 0 ? 'true' : 'false'}
						>
							<RawHTML>{label}</RawHTML>
						</button></li>
					);
				})}
			</ul>
			<div className="tb__tab-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
