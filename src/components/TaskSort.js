import React, { Component } from 'react';
class TaskSort extends Component {


    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue)
    }

    render() {

        return (


            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown pd-30">
                    <button className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <p
                                role="button"
                                className={this.props.sort.by === 'name' && this.props.sort.value === 1 ? 'sort_selected' : ''} >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
							    </span>
                            </p>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <p
                                role="button"
                                className={this.props.sort.by === 'name' && this.props.sort.value === -1 ? 'sort_selected' : ''}>
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
							    </span>
                            </p>
                        </li>
                        <li role="separator" className="divider" />
                        <li onClick={() => this.onClick('status', 1)}>
                            <p
                                role="button"
                                className={this.props.sort.by === 'status' && this.props.sort.value === 1 ? 'sort_selected' : ''}>
                                Trạng Thái Kích Hoạt</p></li>
                        <li onClick={() => this.onClick('status', -1)}>
                            <p
                                role="button"
                                className={this.props.sort.by === 'status' && this.props.sort.value === -1 ? 'sort_selected' : ''}>
                                Trạng Thái Ẩn</p></li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default TaskSort;
