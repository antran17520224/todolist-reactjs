import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import TaskControl from './components/TaskControl'
import TaskList from './components/TaskList';
import {  findIndex } from 'lodash'
import _ from 'lodash'
import demo from './training/demo'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [], //unique , name , status
			isDisplayForm: true,
			taskEditing: null,
			filter: {
				name: '',
				status: -1,
			},
			keyword: '',
			sort: {
				by: 'name',
				value: 1,
			}
		}
	}

	componentWillMount() {
		if (localStorage && localStorage.getItem('tasks')) {
			let tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks: tasks
			})
		}
	}

	onToggleForm = () => {
		if (this.state.isDisplayForm && this.state.taskEditing) {
			this.setState({
				isDisplayForm: true,
				taskEditing: null,
			})
		}
		else {
			this.setState({
				isDisplayForm: !this.state.isDisplayForm,
				taskEditing: null,
			})
		}

	}

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false,
			taskEditing: null,
		})
	}

	onShowForm = () => {
		this.setState({
			isDisplayForm: true
		})
	}

	s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	generateID() {
		return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4();
	}

	onSubmit = (data) => {
		var { tasks } = this.state;
		if (data.id === '') {
			data.id = this.generateID();
			tasks.push(data);
		} else {
			var index = this.findIndex(data.id);
			console.log(tasks[index]);
			console.log(data);
			tasks[index] = data
		}
		this.setState({
			tasks: tasks
		})
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	onUpdateStatus = (id) => {
		var { tasks } = this.state;
		// var index = this.findIndex(id);
		var index = findIndex(tasks,(task)=>{
			return task.id === id
		})
		

		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks
			})
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
	}

	findIndex = (id) => {
		var result = -1;
		var { tasks } = this.state;
		tasks.forEach((task, index) => {
			if (task.id === id) {
				result = index;
			}
		})
		return result;
	}

	onDelete = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if (index !== -1) {
			tasks.splice(index, 1)
			this.setState({
				tasks: tasks
			})
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		this.onCloseForm();
	}

	onUpdate = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		var taskEditing = tasks[index]
		this.setState({
			taskEditing: taskEditing
		})
		this.onShowForm();
	}

	onFilter = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus)
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus,
			}
		})
	}

	onSearch = (keyword) => {
		this.setState({
			keyword: keyword,
		})
	}

	onSort = async (sortBy, sortValue) => {
		await this.setState({
			sort: {
				by: sortBy,
				value: sortValue
			}
		})
		console.log(this.state.sort);
	}

	render() {

		let { tasks, isDisplayForm, taskEditing, filter, keyword, sort } = this.state;
		let emlTaskForm = isDisplayForm ?
			<TaskForm
				onCloseForm={this.onCloseForm}
				onSubmit={this.onSubmit}
				taskEditing={taskEditing}
			/> : '';
		if (filter) {
			if (filter.name) {
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1
				})
			}
			tasks = tasks.filter((task) => {
				if (filter.status === -1) {
					return task
				} else {
					return task.status === (filter.status === 1 ? true : false)
				}
			})
		}

		// if (keyword) {
		// 	tasks = tasks.filter((task) => {
		// 		return task.name.toLowerCase().indexOf(keyword) !== -1
		// 	})
		// }

		tasks = _.filter(tasks, (task) => {
			return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
		})

		if(sort.by === 'name'){
			tasks.sort((a,b)=> {
				if(a.name > b.name) return sort.value
				else if( a.name < b.name ) return -sort.value
				else return 0;
			})
		}else{
			tasks.sort((a,b)=> {
				if(a.status > b.status) return -sort.value
				else if( a.status < b.status ) return sort.value
				else return 0;
			})
		}

		return (

			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						{emlTaskForm}
					</div>
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<div className="pd-30">
							<button
								type="button"
								className="btn btn-primary"
								onClick={this.onToggleForm}>
								<i className="fa fa-plus"></i>
								Thêm Công Việc
							</button>

						</div>

						<TaskControl
							onSearch={this.onSearch}
							onSort={this.onSort}
							sort={sort} />

						<div className="row mt-15">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<TaskList
									tasks={tasks}
									onUpdateStatus={this.onUpdateStatus}
									onDelete={this.onDelete}
									onUpdate={this.onUpdate}
									onFilter={this.onFilter} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default App;
