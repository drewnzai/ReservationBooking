
# Reservation Booking System

This project is a room reservation system for a hotel, allowing users to manage their reservations easily through a web interface. The system is built with a **Spring Boot** backend, a **React (Typescript)** frontend, and **MySQL** as the database.

## Features

-   **User Authentication**:
    -   Login
    -   Signup
    -   Logout
-   **Reservation Management**:
    -   View all reservations
    -   Make new reservations
    -   Delete existing reservations

## Technologies Used

-   **Backend**: [Spring Boot](https://spring.io/projects/spring-boot)
-   **Frontend**: [React](https://reactjs.org/) with [Typescript](https://www.typescriptlang.org/)
-   **Database**: [MySQL](https://www.mysql.com/)

## Getting Started

### Prerequisites

-   Ensure you have **Java** and **Maven** installed to run the backend.
-   Ensure you have **Node.js** and **npm** (or **yarn**) installed to run the frontend.
-   Ensure you have a running **MySQL** instance.

### Running the Backend

1.  **Navigate to the backend directory**:
    
   ```bash
   cd backend
```
2. **Start the Spring Boot application**:
 ```bash
 mvn spring-boot:run
 ```
### Running the Frontend

1.  **Navigate to the frontend directory**:
```bash
cd frontend
```
2. **Install dependencies**:
```bash
npm install
```
3. **Start the React development server**:
```bash
npm run dev
```

### Database Setup

Ensure you have a MySQL instance running. You can set up the database by creating a new schema named `reservationbooking`:

```sql
CREATE DATABASE reservationbooking;
```
### Configuration

You'll need to create an `application.properties` file in the `backend/src/main/resources` directory with the following template values:
```properties
# Application Name
spring.application.name=ReservationBooking

############# MySQL Config ############################################
spring.datasource.url=jdbc:mysql://localhost:3306/reservationbooking
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

############# JWT Config ################################################
jwt.secret=your_jwt_secret_key
jwt.expiration.time=your_expiration_time_in_milliseconds

############# Mail Properties ###########################################
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_email_password
spring.mail.protocol=smtp
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```
Replace the placeholders (e.g., `your_username`, `your_password`, `your_jwt_secret_key`, `your_email@gmail.com`, etc.) with your actual configuration values.

### Usage

Once both the backend and frontend are running:

-   Open your browser and navigate to `http://localhost:3000` (or the port specified in your React setup) to access the frontend.
-   You can log in, sign up, make reservations, view your reservations, or delete them through the user interface.

### Troubleshooting

-   **Database connection issues**: Ensure your MySQL instance is running and that the `application.properties` file has the correct credentials.
-   **Port conflicts**: If you encounter port conflicts, ensure no other applications are using ports `8080` (for Spring Boot), `3000` (for normal user), and `5173` (for administrators).
-   **Email sending issues**: If emails are not being sent, verify the SMTP configuration in your `application.properties` and consider using an App Password if you're using Gmail.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

