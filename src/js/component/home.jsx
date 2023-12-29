import React, {useState} from "react";

<script src="https://kit.fontawesome.com/c8a0c95e22.js" crossorigin="anonymous"></script>


//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);
	return (
		<div className="container">
			<h1>TODOLIST {inputValue}</h1>
			<ul>
				<li>
					<input type="text"
					onChange={(e) => setInputValue(e.target.value)} 
					value={inputValue} 
					onKeyPress={(e) => {
						if(e.key === "Enter"){
							setList(list.concat([inputValue]));
							setInputValue("");
						}
					}}
					placeholder="¿Algo más que agregar?"></input>
				</li>
				{list.map((item, index) =>(
					<li>{item} {" "}
						<span 
						onClick={() => 
						setList(
							list.filter((t, currentItem) => index != currentItem))}>X</span>
					</li>
				))}
			</ul>
			<div>{list.length} pendientes</div>
		</div>
	);
};

export default Home;
