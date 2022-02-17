import React, { useEffect, useState } from "react";
import cl from "./tasks.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadTasks } from "../../../store/taskSlice";
import { uploadCategories } from "../../../store/categoriesSlice";
import { NavLink, useParams } from "react-router-dom";
import ReactMapGL, { Marker } from 'react-map-gl';
import { getUsers } from '../../../store/usersSlice';
import ListGroup from "react-bootstrap/ListGroup";

const TasksCategories = () => {
  const tasks = useSelector((state) => state.task.task);
  const categories = useSelector((state) => state.categories.categories);
  const users = useSelector((state) => state.users.users);


  const [text, setText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uploadTasks());
    dispatch(uploadCategories());
    dispatch(getUsers())
  }, [dispatch]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    return task.header.toLowerCase().includes(text.toLowerCase());
  });

  const { id } = useParams();

  const [viewport, setViewport] = useState({
    latitude: 43.31195,
    longitude: 45.68895,
    width: "300px",
    height: "300px",
    zoom: 10,
  });

  return (
    <div>
      <div className="row">
        <div className="map col-3">
          <div className="border border-dark rounded col-8 text-center">
            <b className="pt-5 ">Категории</b> <hr className="m-1"/>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <NavLink to="/tasks" className="text-decoration-none text-black">
                  Все категории
                </NavLink>
              </ListGroup.Item>
              {categories.map((item) => {
                return (
                    <ListGroup.Item>
                      <NavLink
                        className="text-dark my-2 text-decoration-none"
                        to={`/tasks/category/${item._id}`}
                    >
                      {item.name}
                    </NavLink></ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={text}
              onChange={(e) => handleChange(e)}
              placeholder="Напишите с чем вам нужна помощь"
              aria-label="Напишите с чем вам нужна помощь"
              aria-describedby="basic-addon2"
            />
          </div>
          {filteredTasks.map((item) => {
            if (id === item.category) {
              return (
                <NavLink to={`/tasks/${item._id}`}>
                <div
                  className="shadow border border-dark rounded-2 p-4 mt-3"
                  id="task"
                >
                  <div className="row">
                    <div className="img col-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149452.png"
                        alt=""
                        width="50"
                        height="50"
                      />
                    </div>
                    <h3 className="col mt-1">{item.header}</h3>
                    <div className="col-2">
                      <h3 className="mb-2">{item.price}₽</h3>
                      {users.map((user) => {
                        if (user._id === item.user) {
                          return(
                            <h6 className="text-center">{`${ user.firstName } ${user.lastName}`}</h6>
                          )
                        }
                      })}
                    </div>
                  </div>
                  <div className="row">
                    {categories.map((category) => {
                      if (category._id === item.category) {
                        return (
                          <div className="bg-danger text-white text-center rounded-pill col-3 mx-1 pb-1">
                            <small className="mx-2">{category.name}</small>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                </NavLink>
              );
            }
          })}
        </div>
        <div className="col-1">
          <div className="arrow-block">
            <div className={cl.mapBorder}>
              <ReactMapGL
                  {...viewport}
                  mapboxApiAccessToken="pk.eyJ1IjoiZXhjMG0iLCJhIjoiY2t4NnFoZTVkMnZpMjJ2cDh2aDllYjFmaCJ9.ALFjshQYvyK8G1RHIMSj3w"
                  mapStyle="mapbox://styles/exc0m/ckx6qzvrb8be414o48ev4me7x"
                  onViewportChange={(viewport) => {
                    setViewport(viewport);
                  }}
              >
                {tasks.map(item => {
                  if (item.category === id){
                    return (
                        <Marker latitude={Number(item.latitude)} longitude={Number(item.longitude)}>
                          <img
                              width={"15px"}
                              src="https://pngicon.ru/file/uploads/ikonka-geolokatsii-85x128.png"
                              alt=""
                          />
                        </Marker>
                    )
                  }
                })}
              </ReactMapGL>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksCategories;
