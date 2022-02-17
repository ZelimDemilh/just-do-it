import React from "react";
import Button from "react-bootstrap/Button";
import cl from "../HomePage.module.css";
import icon1 from "../Iconly/icon1.png";
import icon2 from "../Iconly/icon2.png";
import icon3 from "../Iconly/icon3.png";
import icon4 from "../Iconly/icon4.png";

const SecondSlide = () => {
  const token = localStorage.getItem("token");

  return (
    <div
      className={`d-flex flex-column text-center justify-content-center ${cl.backImg2} `}
    >
      <div className="container">
        <div className="text-center text-white m-4">
          <h2>Выбирайте удобный формат сотрудничества</h2>
        </div>
        <div
          className={`w-100 d-flex py-3 align-items-center justify-content-around text-center`}
        >
          <div
            className={` p-3 h-100 border-end border-2 ${cl.format_zadanie}`}
          >
            <div className={`${cl.word_SecondSlide}`}>
              {" "}
              Создайте{" "}
              <span className={`${cl.frilans_proect}`}> фриланс проетк</span>
            </div>
            <span>
              получите лучшие предложения по цене, срокам от фрилансеров
            </span>
              <br/>
              <button className={`${cl.btn_zakaz}`}> Разместить Заказ</button>

          </div>
          <div
            className={` p-3 h-100 border-end border-2 ${cl.format_zadanie}`}
          >
            {/*<img src={icon2} alt="" className="my-3" />*/}
            <h5>Выбираете в каталоге исполнителя</h5>
            <span>Сравнивайте опыт исполнителей, стоимость сроки</span><br/>

              <button className={`${cl.btn_zakaz}`}> Выбрать заказ</button>

          </div>
        </div>
        <div className="mt-5">
          <Button
            href={token ? "/tasks" : "/signIn"}
            variant="outline-light p-3"
          >
            Начни прямо сейчас
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecondSlide;
