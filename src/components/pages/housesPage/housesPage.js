import React, {Component} from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../sevices/gotService';
import RowBlock from '../../rowBlock';
export default class housesPage extends Component {
    gotService = new gotService();

    state = {
        selectedItem: 2,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render () {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllHouses}
                        renderItem={({name}) => name}/>
        )

        const charDetails = (
            <CharDetails 
                itemId={this.state.selectedItem}
                getData={this.gotService.getHouse}>
                <Field field="name" label='Name'/>
                <Field field="region" label='Region'/>
                <Field field="words" label='Words'/>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}
