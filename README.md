# MentorAI 📱🤖

MentorAI é um aplicativo mobile desenvolvido em **React Native (Expo)** com uma **API em .NET 8** conectada a **Oracle**, focado em trilhas/cursos, habilidades (skills) e uma área de IA para análise de perfil/foto.

O projeto foi construído com navegação moderna via **expo-router**, integração com API REST e interface limpa e fácil de entender.

---

## 🔗 Link da API (.NET)

A API oficial do MentorAI está neste repositório:

- **GitHub:** https://github.com/Caepena/MentorAI.NET

### URL base para uso no app

Quando a API estiver rodando localmente, a URL base será algo como:

- Emulador Android: `http://10.0.2.2:5134`
- iOS Simulator / Web: `http://localhost:5134`
- Celular físico (mesma rede do PC): `http://SEU_IP:5134`  
  Ex.: `http://192.168.0.184:5134`

Você deve colocar essa URL no arquivo `.env` do app:

```env
EXPO_PUBLIC_API_BASE_URL=http://SEU_IP:5134
```

Após alterar o `.env`, reinicie o Expo:

```bash
npx expo start -c
```

---

## ✨ Funcionalidades

### ✅ Autenticação (simples)
- **Cadastro de usuário** consumindo `POST /User`
- **Login por e-mail** consumindo `GET /User`
- Sessão salva localmente (AsyncStorage)

> Observação: a API não possui endpoints de autenticação com senha/JWT, então o login atual é por e-mail apenas.

### ✅ Cursos e Trilhas
- Listagem de cursos/trilhas pelo endpoint `GET /Course`
- Detalhe de curso pelo endpoint `GET /Course/{id}`
- Criação de curso pelo endpoint `POST /Course`

### ✅ Skills (Habilidades)
- Listagem de skills pelo endpoint `GET /Skill`
- Criação de skills pelo endpoint `POST /Skill`

### ✅ IA – Análise de Perfil / Foto
- Usuário escolhe uma foto (galeria/câmera)
- App gera análise local simples com feedback e score

> Gancho preparado para integrar com um futuro endpoint `/IA/analisar`.

---

## 🧰 Tecnologias utilizadas

### Mobile (Frontend)
- **Expo + React Native**
- **expo-router** (navegação baseada em arquivos)
- **Axios** (HTTP client)
- **AsyncStorage** (sessão local)
- **expo-image-picker** (câmera/galeria)
- Tema padronizado (`constants/theme.ts`)

### API (Backend)
- **.NET 8**
- **Entity Framework Core**
- **Oracle Database**
- Swagger para documentação e testes

---

## 📂 Estrutura de Pastas (Mobile)

```
app/
  (auth)/
    login.tsx
    register.tsx
  (app)/
    _layout.tsx          # Drawer (menu lateral)
    index.tsx            # Home/Dashboard
    ia.tsx               # IA profile/foto
    profile.tsx          # Perfil do usuário
    courses/
      index.tsx          # Lista de cursos
      [id].tsx           # Detalhe de curso
      create.tsx         # Criar curso
    skills/
      index.tsx          # Lista de skills
      create.tsx         # Criar skill

components/
  AppButton.tsx
  AppInput.tsx
  CourseCard.tsx

services/
  api.ts
  auth.ts
  courseService.ts
  skillService.ts
```

---

## 🔌 Endpoints da API

A API expõe atualmente os seguintes controllers:

### **User**
- `GET /User`
- `POST /User`
- `GET /User/{id}`
- `PUT /User/{id}`
- `DELETE /User/{id}`
- `GET /User/paginado`
- `POST /User/{userId}/courses/{courseId}`

### **Course**
- `GET /Course`
- `POST /Course`
- `GET /Course/{id}`
- `PUT /Course/{id}`
- `DELETE /Course/{id}`
- `GET /Course/paginado`

### **Skill**
- `GET /Skill`
- `POST /Skill`
- `GET /Skill/{id}`
- `PUT /Skill/{id}`
- `DELETE /Skill/{id}`
- `GET /Skill/paginado`

---

## ▶️ Como rodar o app (Mobile)

### 1) Instalar dependências
Na raiz do projeto:

```bash
npm install
```

### 2) Criar `.env`
Na raiz (mesmo nível do `package.json`):

```env
EXPO_PUBLIC_API_BASE_URL=http://SEU_IP:5134
```

> Se estiver no emulador Android use:  
> `http://10.0.2.2:5134`

### 3) Rodar expo
```bash
npx expo start -c
```

---

## ▶️ Como rodar a API (Backend)

### 1) Restaurar dependências
```bash
dotnet restore
```

### 2) Ajustar string de conexão Oracle
Edite o arquivo:

```
MentorAI.API/appsettings.json
```

Exemplo:

```json
"ConnectionStrings": {
  "OracleConnection": "User Id=MENTORAI;Password=123456;Data Source=localhost:1521/XEPDB1;"
}
```

### 3) Rodar migrations (opcional)
Se necessário:

```bash
dotnet tool install --global dotnet-ef
dotnet ef database update --project MentorAI.Infrastructure --startup-project MentorAI.API
```

### 4) Rodar API aceitando requisições externas
```bash
dotnet run --project MentorAI.API --urls "http://0.0.0.0:5134"
```

### 5) Abrir Swagger
Abra no navegador:

```txt
http://localhost:5134/swagger
```

---

## 🧯 Problemas comuns

### **Network Error no app**
- Celular e PC precisam estar no **mesmo Wi-Fi**
- API deve rodar com:
  ```bash
  --urls "http://0.0.0.0:5134"
  ```
- Libere porta **5134 no Firewall do Windows**
- Atualize IP no `.env`

### **Rotas aparecendo no menu lateral**
Rotas como `courses/[id]` ou `skills/create` podem aparecer automaticamente no Drawer.
Para esconder, adicione no `_layout.tsx`:

```tsx
<Drawer.Screen name="courses/[id]" options={{ drawerItemStyle: { display: "none" } }} />
<Drawer.Screen name="skills/create" options={{ drawerItemStyle: { display: "none" } }} />
```

---

## 🗺️ Roadmap (melhorias futuras)

- ✅ Criar autenticação real com senha/JWT (`/Auth/login`, `/Auth/register`)
- ✅ Integrar IA no backend com upload de imagem
- ✅ Relacionar Skills com Usuários/Cursos
- ✅ Tela de edição de perfil (PUT /User/{id}`)
- ✅ Paginação real para Course/Skill

---

## 👨‍💻 Autor

Projeto desenvolvido por:
**Kauã Fermino Zipf - RM: 558957
  Caetano Matos Penafiel - RM: 557984
  Victor Egidio Lira - RM: 556653** 

---

## 📄 Licença

Este projeto está sob licença MIT.  
Sinta-se livre para usar e evoluir.
