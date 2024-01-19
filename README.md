# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# React + Vite + TailwindCSS

# PoliParking

## Introduction

Web application that manages the entry and exit of vehicles to the parking lot of a university institution.

## Description

The application will be used by the security personnel of the institution, who will be in charge of registering the entry and exit of vehicles to the parking lot. The application will allow you to register the entry and exit of vehicles, as well as the registration of the vehicle and the driver.

## Objectives

- Register the entry and exit of vehicles to the parking lot.
- Register the vehicle and the driver.

## Scope

- The application will be used by the security personnel of the institution.
- The application will be used in the parking lot of the institution.
- The application will be used to register the entry and exit of vehicles to the parking lot.
- The application will be used to register the vehicle and the driver.

## Requirements

1. There must be a Login, user and password, these can be in a state by default, it is not necessary to register them.
2. The vehicles allowed to enter the parking lot of the Medellin headquarters are: cars and motorcycles.
3. Each employee must previously register the vehicles he/she has, registering for:
- motorcycles: license plate number, displacement and make.
- cars: license plate number, model and make.
The corresponding validations must be made.
- License plates are unique, as is the identity document.
- For the make, model and displacement it is recommended to use a selectable list of values.
4. At the moment of entering the parking lot, the attendant must register the entry by means of the employee's ID or by the vehicle's license plate, recording the date and time of entry, and the cell number in which the vehicle is going to be parked.
a. If the attendant has entered a license plate, all vehicles associated with that license plate number must be shown, and then the one being entered must be selected.
b. If the security guard has entered a license plate number, all the information related to the vehicle should be displayed and then mark the entry.
c. There are N cells for cars and M cells for motorcycles (free way to define those values, minimum 5).
5. Display on one page the parking cells, which are available and which are occupied with respective information.
6. The application must allow the exit of the vehicles from the parking lot, so that the occupied cell is enabled again. the occupied cell is enabled again.

## Non-functional Requirements

- React Router
- Hooks
- Context
- Components
- Opcional Library UI

## HU (User Stories)

- As a user, I want to be able to register the entry and exit of vehicles to the parking lot.
- As a user, I want to be able to register the vehicle and the driver.

## Acceptance Criteria

- The application must allow the registration of the entry and exit of vehicles to the parking lot.
- The application must allow the registration of the vehicle and the driver.

## Definition of Finished

- The application must allow the registration of the entry and exit of vehicles to the parking lot.
- The application must allow the registration of the vehicle and the driver.

## Installation

```bash
npm install
```

## Execution

```bash
npm run dev
```

## Construction

```bash
npm run build
```

## User Login

username: jose chaverra
password: 7777