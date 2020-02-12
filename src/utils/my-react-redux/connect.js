import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const defaultMapStateToProps = ()=>{}
const defaultMapDispatchToProps = dispatch => ({ dispatch });

export default function connect(mapStateToProps, mapDispatchToProps){
    if(!mapStateToProps){
        mapStateToProps = defaultMapStateToProps
    }
    if(!mapDispatchToProps){
        mapDispatchToProps = defaultMapDispatchToProps
    }
    return function wrapWithConnect(WrappedComponent){
        return class Connect extends Component {

            static contextTypes = {
                store: PropTypes.shape({
                    subscribe: PropTypes.func.isRequired,
                    dispatch: PropTypes.func.isRequired,
                    getState: PropTypes.func.isRequired
                }).isRequired
            }

            constructor(props,context){
                super(props,context);
                this.store = context.store;
                this.state = mapStateToProps(this.store.getState(),this.props);

                if(typeof mapDispatchToProps === 'function') {
                    this.mappedDispatch = mapDispatchToProps(this.store.dispatch, this.props);
                }else{
                    this.mappedDispatch = bindActionCreators(this.mapDispatchToProps, this.props)
                }
            }

            // connect((state)=> ({order: state.order})),
            //     (dispatch) => ({
            //         actions: bindActionCreators({
            //             actionCreator1: actionCreator1,
            //             actionCreator2: actionCreator2
            //     }),dispatch)
            //     //等价于
            //     connect((state)=> ({order: state.order})),
            //     (dispatch) => ({
            //     actions: {
            //         actionCreator1: () => dispacth(actionCreator1()),
            //         actionCreator2: () => dispacth(actionCreator2())
            //     }}))

            componentDidMount() {
                this.unsub = this.store.subscribe(() => {
                    const mappedState = mapStateToProps(this.store.getState());
                    this.setState(mappedState);
                });
            }
    
            componentWillUnmount() {
                this.unsub();
            }
    
            render() {
                return (
                    <WrappedComponent {...this.state}  {...this.props} {...this.mappedDispatch}/>
                )
            }
        }
    }
}