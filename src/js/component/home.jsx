import React, { useState, useEffect } from "react";

<script src="https://kit.fontawesome.com/c8a0c95e22.js" crossorigin="anonymous"></script>

const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [list, setList] = useState([]);
	const [taskHover, setTaskHover] = useState(null);
  	const [isLoading, setIsLoading] = useState(true);

	let listaVacia = [{ "label": "No hay tareas, agregue tareas", "tareas finalizadas": false }]
	const [tasksListApi, setTasksListApi] = useState([
		{ "label": listaVacia.map(item => item.label).toString(), "tareas finalizadas": false }
	]);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://playground.4geeks.com/apis/fake/todos/user/CDAVIS')
		  .then(response => response.json())
		  .then((data) => {
			setList(data.map(item => item.label));
			setIsLoading(false);
		  })
		  .catch(err => {
			console.error(err);
			setIsLoading(false);
		  });
	  }, []);
	

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/cdavis', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([])
		})
			.then(response => response.json())
			.then()
			.catch(err => err)
	})

	
	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/cdavis')
			.then(response => response.json())
			.then((data) => setList(data.map(item => item.label)))
			.catch(err => console.error(err))
	}, []);

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/cdavis', {
			method: "PUT",
			body: JSON.stringify(tasksListApi),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); 
				console.log(resp.status); 
				console.log(resp.text()); 
				return resp.json(); 
			})
			.then(data => {
				
				console.log(data); 
			})
			.catch(error => {
				console.log(error);
			});
	}, [tasksListApi]);

	const enterPressed = (e) => {
		if (e.key === "Enter") {
			let tareaNueva = { "label": inputValue, "tareas finalizadas": false };
			if (list.length === 1 && tasksListApi[0].label === listaVacia.map(item => item.label).toString()) {
				setTasksListApi([tareaNueva])
				setList([tareaNueva.label])
			}
			else {
				setTasksListApi([tareaNueva, ...tasksListApi])
				setList(prevList => [inputValue, ...prevList]);
			}
			setInputValue("")
		}
	}

	const deleteTask = (taskIndex) => {
		let listaSinTareas = []
		listaSinTareas = list.filter((task, index) => {
			if (index !== taskIndex) {
				return task
			}
		})
		let listaTareas = [];
		if (list.length === 1) {
			listaTareas = [{ "label": listaVacia.map(item => item.label).toString(), "tareas finalizadas": false }];
		} else {
			listaSinTareas.map((task, index) => {
				let tareaNueva = { "label": task, "tareas finalizadas": false };
				listaTareas.push(tareaNueva);
			});
		}
		setTasksListApi(listaTareas);
		setList(listaTareas.map(item => item.label));
	}

	const deleteAll = () => {
		setTasksListApi(listaVacia);
		setList(listaVacia.map(item => item.label))
	}

	return (
		<div className="container mt-5">
			<h1 className="d-flex justify-content-center">TODOLIST</h1>
			<div className="card">
				<input type="text" value={inputValue} placeholder="Ingresar tareas" onChange={(e) => setInputValue(e.target.value)} onKeyDown={enterPressed} className="card-header border border-0 ps-5" />
				<ul className="list-group list-group-flush">
					{list.map((task, index) =>
						<li className="list-group-item ps-5 d-flex" key={index} onMouseEnter={() => setTaskHover(index)} onMouseLeave={() => setTaskHover(null)}>
							<p className="me-auto mb-0">{task}</p>
							{taskHover === index ? <span className="redDeleteButton" onClick={() => deleteTask(index)}> x </span> : ""}
						</li>
					)}
					
					{list.length === 1 && tasksListApi[0].label === listaVacia.map(item => item.label).toString() ?
						<li className="list-group-item fontSizeSmall">0 tareas pendientes</li>
						:
						<li className="list-group-item fontSizeSmall">{list.length} item left</li>
					}

					
				</ul>
			</div>
			<div >
				<button className="btn btn-success" type="button" onClick={() => deleteAll()}>Borrar todas las tareas</button>
			</div>
		</div>
	);
};

export default Home;