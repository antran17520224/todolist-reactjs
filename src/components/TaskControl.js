import React, { Component } from 'react';
import TaskSearch from './TaskSearch'
import TaskSort from './TaskSort'

class TaskControl extends Component {


    render() {
        return (
            <div className="row mt-15">
                <TaskSearch onSearch={this.props.onSearch} />
                <TaskSort 
                    onSort={this.props.onSort}
                    sort={this.props.sort} />
            </div>
        );
    }

}

export default TaskControl;
