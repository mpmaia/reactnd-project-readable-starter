import React from "react";
import { connect } from 'react-redux';
import {fetchCategories} from '../../redux/actions/index';
import PropTypes from "prop-types";
import {List} from "material-ui";
import { ListItem, ListItemText } from 'material-ui/List';
import {Link} from "react-router-dom";

class CategoryList extends React.Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const { categories } = this.props;
        return (
            <List>
                {
                    categories && categories.map(c => (
                        <ListItem button key={c.name}>
                            <Link to={`/${c.name}`}>
                                <ListItemText primary={c.name}/>
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        );
    }
}

CategoryList.propTypes = {
    categories: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
