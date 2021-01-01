// Module imports
import { useEffect } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { Abbreviation } from 'components/Abbreviation'
import { Figure } from 'components/Figure'
import { FigureCaption } from 'components/FigureCaption'
import { MermaidRenderer } from 'components/MermaidRenderer'
import Codepen from 'components/Codepen'
import Tweet from 'components/Tweet'





// Local constants
const availableDirectives = {
	containerDirective: {
		mermaid: MermaidRenderer,
		figure: Figure,
	},
	leafDirective: {
		codepen: Codepen,
		figcaption: FigureCaption,
		tweet: Tweet,
	},
	textDirective: {
		abbr: Abbreviation,
	},
}





const Directive = props => {
	const {
		attributes,
		children,
		name,
		node,
	} = props

	const DirectiveComponent = availableDirectives[node.type]?.[name.toLowerCase()]

	if (!DirectiveComponent) {
		return null
	}

	return (
		<DirectiveComponent
			{...attributes}
			node={node}>
			{children}
		</DirectiveComponent>
	)
}

Directive.defaultProps = {
	attributes: {},
	children: null,
}

Directive.propTypes = {
	attributes: PropTypes.object,
	children: PropTypes.node,
	name: PropTypes.string.isRequired,
	node: PropTypes.object.isRequired,
}





export { Directive }
