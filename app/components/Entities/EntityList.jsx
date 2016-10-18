import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { changeEntityOfTerminalTicket, getEntityScreenItems } from '../../queries';
import * as Actions from '../../actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class EntityListButton extends React.Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const style = {
            'color': this.props.labelColor,
            'backgroundColor': this.props.color,
            'margin': '4px',
            'height': 'auto',
            'minHeight': '65px',
            'flex': '1 1 11%',
            'lineHeight': '1.3',
            'wordWrap': 'breakWord',
            'whiteSpace': 'normal'
        };

        return (
            <Button
                style={style}
                className='entityButton'
                onClick={this.props.onClick}>
                <ReactMarkdown source={this.props.caption} />
            </Button>);
    }
}

class EntityList extends React.Component {

    loadItems(name) {
        this.props.loadEntityScreenRequest(name);
        getEntityScreenItems(name, (items) => {
            this.props.loadEntityScreenSuccess(name, items);
        })
    }

    componentDidMount() {
        this.loadItems(this.props.location.query.screenName);
    }

    render() {
        if (!this.props.items) {
            return <p>Loading...</p>
        }

        return (
            <div className="entityList">
                {this.props.items.map(x =>
                    <EntityListButton
                        key={x.name}
                        caption={x.caption}
                        labelColor={x.labelColor}
                        color={x.color}
                        onClick={(e) => this.selectEntity(x.name)} />
                )}
            </div>
        );
    }

    selectEntity = (entityName) => {
        changeEntityOfTerminalTicket(this.props.location.query.terminalId, 'Tables', entityName, () => {
            this.context.router.push('/');
        });
    }
}

EntityList.contextTypes = {
    router: React.PropTypes.object
}

const mapStateToProps = state => ({
    name: state.entityList.get('name'),
    isFetching: state.entityList.get('isFetching'),
    items: state.entityList.get('items')
})

const mapDispatchToProps = ({
    loadEntityScreenRequest: Actions.loadEntityScreenRequest,
    loadEntityScreenSuccess: Actions.loadEntityScreenSuccess
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntityList)