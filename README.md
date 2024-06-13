<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Dokumentasi untuk Meng-clone dan Menjalankan Proyek

### 1. Clone Repository

Langkah pertama adalah meng-clone repository dari GitHub ke lokal Anda.

```bash
git clone https://github.com/Rickyfg13/library-systems.git
```

### 2. Masuk ke Direktori Proyek

Pindah ke direktori proyek yang baru saja di-clone.

```bash
cd library-systems
```

### 3. Instalasi Dependencies

Instal semua dependencies yang diperlukan menggunakan pnpm.

```bash
pnpm install
```

## Setup Database Local

```bash
# Install Package
Recommended = XAMPP  https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.1.25/xampp-windows-x64-8.1.25-0-VS16-installer.exe/download

# Create Database
Create Database library (Bisa manual menggunakan XAMPP)

#Configurasi Database
Buat Folder .env lalu copy credential berikut:

DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=library

#Jalankan Migration
$ pnpm run typeorm migration:run

# Jalankan server kembali dengan
$ pnpm run start:dev
```

# Dokumentasi API Library System

## Daftar Isi

- [Autentikasi](#autentikasi)
  - [Register User](#register-user)
  - [Login User](#login-user)
- [Buku](#buku)
  - [Create Buku](#create-buku)
  - [Pinjam Buku](#pinjam-buku)
  - [Kembalikan Buku](#kembalikan-buku)

## Autentikasi

### Register User

**Endpoint**: `POST /users/register`

**Deskripsi**: Mendaftarkan pengguna baru.

**Permintaan**:

- **URL**: `http://localhost:3000/users/register`
- **Metode**: `POST`
- **Header**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "Password123"
  }
  ```
  Respon Sukses:
- **Status** : `201 Created`
- **Body**:
  ```json
  {
    "id": 1,
    "email": "test@example.com"
  }
  ```

Respon Gagal:

- **Status** : `400 Bad Request`
- **Body**:
  ```json
  {
    "statusCode": 400,
    "message": "Validation error message"
  }
  ```

### Login User

**Endpoint**: `POST /users/login`

**Deskripsi**: `Login pengguna yang sudah terdaftar.`

**Permintaan**:

- **URL**: `http://localhost:3000/users/login`
- **Metode**: `POST`
- **Header**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "Password123"
  }
  ```
  Respon Sukses:
- **Status** : `200 Ok`
- **Body**:
  ```json
  {
    "access_token": "jwt_token"
  }
  ```

Respon Gagal:

- **Status** : `401 Unauthorized`
- **Body**:
  ```json
  {
    "statusCode": 401,
    "message": "Invalid credentials"
  }
  ```

## Buku

### Create Buku

**Endpoint**: `POST /books/create`

**Deskripsi**: `Menambahkan buku baru ke dalam perpustakaan.`

**Permintaan**:

- **URL**: `http://localhost:3000/books/create`
- **Metode**: `POST`
- **Header**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <jwt_token>`
- **Body**:
  ```json
  {
    "title": "Seni Berpikir",
    "author": "Aurelius"
  }
  ```

Respon Sukses:

- **Status** : `200 Ok`
- **Body**:
  ```json
  {
    "id": 1,
    "title": "Seni Berpikir",
    "author": "Aurelius",
    "borrowedBy": null,
    "borrowedAt": null
  }
  ```

Respon Gagal:

- **Status** : `400 Bad Request`
- **Body**:
  ```json
  {
    "statusCode": 400,
    "message": "Gagal Menambahkan Buku"
  }
  ```

### Pinjam Buku

**Endpoint**: `POST /books/borrow`

**Deskripsi**: `Meminjam buku oleh pengguna yang terautentikasi.`

**Permintaan**:

- **URL**: `http://localhost:3000/books/borrow`
- **Metode**: `POST`
- **Header**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <jwt_token>`
- **Body**:
  ```json
  {
    "bookId": 1
  }
  ```

Respon Sukses:

- **Status** : `200 Ok`
- **Body**:
  ```json
  {
    "id": 1,
    "title": "Seni Hidup Tenang",
    "author": "Aurelius",
    "borrowedBy": {
      "id": 1,
      "email": "test@example.com"
    },
    "borrowedAt": "2023-06-13T00:00:00.000Z"
  }
  ```

Respon Gagal:

- **Status** : `400 Bad Request`
- **Body**:
  ```json
  {
    "statusCode": 400,
    "message": "Buku sedang dipinjam oleh pengguna lain"
  }
  ```

### Kembalikan Buku

**Endpoint**: `POST /books/return`

**Deskripsi**: `Mengembalikan buku yang dipinjam oleh pengguna.`

**Permintaan**:

- **URL**: `http://localhost:3000/books/return`
- **Metode**: `POST`
- **Header**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <jwt_token>`
- **Body**:
  ```json
  {
    "bookId": 1
  }
  ```

Respon Sukses:

- **Status** : `200 Ok`
- **Body**:
  ```json
  {
    "id": 1,
    "title": "Seni Hidup Tenang",
    "author": "Aurelis",
    "borrowedBy": null,
    "borrowedAt": null
  }
  ```

Respon Gagal:

- **Status** : `400 Bad Request`
- **Body**:
  ```json
  {
    "statusCode": 400,
    "message": "Buku ini tidak sedang dipinjam"
  }
  ```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
