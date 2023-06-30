ALTER DATABASE [db_a9b9c2_darkapple55] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET RECOVERY FULL 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET  MULTI_USER 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'db_a9b9c2_darkapple55', N'ON'
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET QUERY_STORE = OFF
GO
USE [db_a9b9c2_darkapple55]
GO
/****** Object:  Table [dbo].[Aulas]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Aulas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Aulas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Categorias] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Edificios]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Edificios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Edificios] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Edificios_Pisos]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Edificios_Pisos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idEdificio] [int] NOT NULL,
	[idPiso] [int] NOT NULL,
 CONSTRAINT [PK_Edificios_Pisos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estados]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estados](
	[id] [int] NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Estados] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Incidentes]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Incidentes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[descripcion] [varchar](200) NOT NULL,
	[idUsuario] [int] NOT NULL,
	[idPisoAula] [int] NOT NULL,
	[fecha] [date] NOT NULL,
	[importancia] [int] NOT NULL,
	[estado] [int] NOT NULL,
	[idUsuarioSolucion] [int] NULL,
	[categoria] [int] NULL,
	[foto] [varchar](500) NULL,
 CONSTRAINT [PK_Incidentes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Niveles_Importancia]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Niveles_Importancia](
	[id] [int] NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Niveles_Importancia] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pisos]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pisos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Pisos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pisos_Aulas]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pisos_Aulas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idEdificioPiso] [int] NOT NULL,
	[idAula] [int] NOT NULL,
 CONSTRAINT [PK_Pisos_Aulas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[foto] [varchar](500) NOT NULL,
	[esSupervisor] [bit] NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios_Aulas]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios_Aulas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NOT NULL,
	[idAula] [int] NOT NULL,
 CONSTRAINT [PK_Usuarios_Aulas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios_Categorias]    Script Date: 22/6/2023 20:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios_Categorias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NOT NULL,
	[idCategoria] [int] NOT NULL,
 CONSTRAINT [PK_Usuarios_Categorias] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Aulas] ON 

INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (1, N'CIDI')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (2, N'1101')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (3, N'1102')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (4, N'1103')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (5, N'1104')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (6, N'1210')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (7, N'1210 BIS')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (8, N'1201')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (9, N'1202')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (10, N'1301')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (11, N'1302')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (12, N'1303')
INSERT [dbo].[Aulas] ([id], [descripcion]) VALUES (13, N'1304')
SET IDENTITY_INSERT [dbo].[Aulas] OFF
GO
SET IDENTITY_INSERT [dbo].[Categorias] ON 

INSERT [dbo].[Categorias] ([id], [descripcion]) VALUES (1, N'Default')
INSERT [dbo].[Categorias] ([id], [descripcion]) VALUES (2, N'Informática')
INSERT [dbo].[Categorias] ([id], [descripcion]) VALUES (3, N'Electrico')
SET IDENTITY_INSERT [dbo].[Categorias] OFF
GO
SET IDENTITY_INSERT [dbo].[Edificios] ON 

INSERT [dbo].[Edificios] ([id], [descripcion]) VALUES (1, N'Yatay 1')
INSERT [dbo].[Edificios] ([id], [descripcion]) VALUES (2, N'Rio 2')
INSERT [dbo].[Edificios] ([id], [descripcion]) VALUES (3, N'Rio 3')
INSERT [dbo].[Edificios] ([id], [descripcion]) VALUES (4, N'Yatay 4')
SET IDENTITY_INSERT [dbo].[Edificios] OFF
GO
SET IDENTITY_INSERT [dbo].[Edificios_Pisos] ON 

INSERT [dbo].[Edificios_Pisos] ([id], [idEdificio], [idPiso]) VALUES (1, 1, 1)
INSERT [dbo].[Edificios_Pisos] ([id], [idEdificio], [idPiso]) VALUES (2, 1, 2)
INSERT [dbo].[Edificios_Pisos] ([id], [idEdificio], [idPiso]) VALUES (3, 1, 3)
INSERT [dbo].[Edificios_Pisos] ([id], [idEdificio], [idPiso]) VALUES (4, 1, 4)
SET IDENTITY_INSERT [dbo].[Edificios_Pisos] OFF
GO
INSERT [dbo].[Estados] ([id], [descripcion]) VALUES (1, N'En espera')
INSERT [dbo].[Estados] ([id], [descripcion]) VALUES (2, N'Asignado')
INSERT [dbo].[Estados] ([id], [descripcion]) VALUES (3, N'Solucionado')
GO
SET IDENTITY_INSERT [dbo].[Incidentes] ON 

INSERT [dbo].[Incidentes] ([id], [nombre], [descripcion], [idUsuario], [idPisoAula], [fecha], [importancia], [estado], [idUsuarioSolucion], [categoria], [foto]) VALUES (29, N'123', N'123', 61, 1, CAST(N'2023-06-19' AS Date), 1, 1, NULL, NULL, N'incidente_29.webp')
INSERT [dbo].[Incidentes] ([id], [nombre], [descripcion], [idUsuario], [idPisoAula], [fecha], [importancia], [estado], [idUsuarioSolucion], [categoria], [foto]) VALUES (30, N'hoplasdas', N'123123', 61, 1, CAST(N'2023-06-20' AS Date), 2, 1, NULL, 1, N'incidente_30.webp')
INSERT [dbo].[Incidentes] ([id], [nombre], [descripcion], [idUsuario], [idPisoAula], [fecha], [importancia], [estado], [idUsuarioSolucion], [categoria], [foto]) VALUES (31, N'123123213', N'asdadas', 61, 1, CAST(N'2023-06-20' AS Date), 2, 1, NULL, 1, N'incidente_31.webp')
INSERT [dbo].[Incidentes] ([id], [nombre], [descripcion], [idUsuario], [idPisoAula], [fecha], [importancia], [estado], [idUsuarioSolucion], [categoria], [foto]) VALUES (32, N'TEST', N'adasdas', 61, 8, CAST(N'2023-06-22' AS Date), 2, 1, NULL, 1, N'incidente_32.webp')
SET IDENTITY_INSERT [dbo].[Incidentes] OFF
GO
INSERT [dbo].[Niveles_Importancia] ([id], [descripcion]) VALUES (1, N'Bajo')
INSERT [dbo].[Niveles_Importancia] ([id], [descripcion]) VALUES (2, N'Medio')
INSERT [dbo].[Niveles_Importancia] ([id], [descripcion]) VALUES (3, N'Alto')
GO
SET IDENTITY_INSERT [dbo].[Pisos] ON 

INSERT [dbo].[Pisos] ([id], [descripcion]) VALUES (1, N'1ro - Yatay 1')
INSERT [dbo].[Pisos] ([id], [descripcion]) VALUES (2, N'2ro - Yatay 1')
INSERT [dbo].[Pisos] ([id], [descripcion]) VALUES (3, N'3ro - Yatay 1')
INSERT [dbo].[Pisos] ([id], [descripcion]) VALUES (4, N'4ro - Yatay 1')
SET IDENTITY_INSERT [dbo].[Pisos] OFF
GO
SET IDENTITY_INSERT [dbo].[Pisos_Aulas] ON 

INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (1, 1, 1)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (2, 1, 2)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (3, 1, 3)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (4, 1, 4)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (5, 1, 5)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (6, 2, 6)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (7, 2, 7)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (8, 2, 8)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (9, 2, 9)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (10, 3, 10)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (11, 3, 11)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (12, 3, 12)
INSERT [dbo].[Pisos_Aulas] ([id], [idEdificioPiso], [idAula]) VALUES (13, 3, 13)
SET IDENTITY_INSERT [dbo].[Pisos_Aulas] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([id], [nombre], [apellido], [email], [foto], [esSupervisor]) VALUES (61, N'AXEL', N'CYMERMAN', N'46917338@est.ort.edu.ar', N'https://lh3.googleusercontent.com/a/AAcHTtfNYujWPyTR2LEW0eWijSrSuVwensoVoKIKMkUY=s96-c', 0)
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
ALTER TABLE [dbo].[Edificios_Pisos]  WITH CHECK ADD  CONSTRAINT [FK_Edificios_Pisos_Edificios] FOREIGN KEY([idEdificio])
REFERENCES [dbo].[Edificios] ([id])
GO
ALTER TABLE [dbo].[Edificios_Pisos] CHECK CONSTRAINT [FK_Edificios_Pisos_Edificios]
GO
ALTER TABLE [dbo].[Edificios_Pisos]  WITH CHECK ADD  CONSTRAINT [FK_Edificios_Pisos_Pisos] FOREIGN KEY([idPiso])
REFERENCES [dbo].[Pisos] ([id])
GO
ALTER TABLE [dbo].[Edificios_Pisos] CHECK CONSTRAINT [FK_Edificios_Pisos_Pisos]
GO
ALTER TABLE [dbo].[Incidentes]  WITH CHECK ADD  CONSTRAINT [FK_Incidentes_Categorias] FOREIGN KEY([categoria])
REFERENCES [dbo].[Categorias] ([id])
GO
ALTER TABLE [dbo].[Incidentes] CHECK CONSTRAINT [FK_Incidentes_Categorias]
GO
ALTER TABLE [dbo].[Incidentes]  WITH CHECK ADD  CONSTRAINT [FK_Incidentes_Estados] FOREIGN KEY([estado])
REFERENCES [dbo].[Estados] ([id])
GO
ALTER TABLE [dbo].[Incidentes] CHECK CONSTRAINT [FK_Incidentes_Estados]
GO
ALTER TABLE [dbo].[Incidentes]  WITH CHECK ADD  CONSTRAINT [FK_Incidentes_Niveles_Importancia] FOREIGN KEY([importancia])
REFERENCES [dbo].[Niveles_Importancia] ([id])
GO
ALTER TABLE [dbo].[Incidentes] CHECK CONSTRAINT [FK_Incidentes_Niveles_Importancia]
GO
ALTER TABLE [dbo].[Incidentes]  WITH CHECK ADD  CONSTRAINT [FK_Incidentes_Pisos_Aulas] FOREIGN KEY([idPisoAula])
REFERENCES [dbo].[Pisos_Aulas] ([id])
GO
ALTER TABLE [dbo].[Incidentes] CHECK CONSTRAINT [FK_Incidentes_Pisos_Aulas]
GO
ALTER TABLE [dbo].[Incidentes]  WITH CHECK ADD  CONSTRAINT [FK_Incidentes_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([id])
GO
ALTER TABLE [dbo].[Incidentes] CHECK CONSTRAINT [FK_Incidentes_Usuarios]
GO
ALTER TABLE [dbo].[Pisos_Aulas]  WITH CHECK ADD  CONSTRAINT [FK_Pisos_Aulas_Aulas] FOREIGN KEY([idAula])
REFERENCES [dbo].[Aulas] ([id])
GO
ALTER TABLE [dbo].[Pisos_Aulas] CHECK CONSTRAINT [FK_Pisos_Aulas_Aulas]
GO
ALTER TABLE [dbo].[Pisos_Aulas]  WITH CHECK ADD  CONSTRAINT [FK_Pisos_Aulas_Edificios_Pisos] FOREIGN KEY([idEdificioPiso])
REFERENCES [dbo].[Edificios_Pisos] ([id])
GO
ALTER TABLE [dbo].[Pisos_Aulas] CHECK CONSTRAINT [FK_Pisos_Aulas_Edificios_Pisos]
GO
ALTER TABLE [dbo].[Usuarios_Aulas]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Aulas_Aulas] FOREIGN KEY([idAula])
REFERENCES [dbo].[Aulas] ([id])
GO
ALTER TABLE [dbo].[Usuarios_Aulas] CHECK CONSTRAINT [FK_Usuarios_Aulas_Aulas]
GO
ALTER TABLE [dbo].[Usuarios_Aulas]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Aulas_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([id])
GO
ALTER TABLE [dbo].[Usuarios_Aulas] CHECK CONSTRAINT [FK_Usuarios_Aulas_Usuarios]
GO
ALTER TABLE [dbo].[Usuarios_Categorias]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Categorias_Categorias] FOREIGN KEY([idCategoria])
REFERENCES [dbo].[Categorias] ([id])
GO
ALTER TABLE [dbo].[Usuarios_Categorias] CHECK CONSTRAINT [FK_Usuarios_Categorias_Categorias]
GO
ALTER TABLE [dbo].[Usuarios_Categorias]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Categorias_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([id])
GO
ALTER TABLE [dbo].[Usuarios_Categorias] CHECK CONSTRAINT [FK_Usuarios_Categorias_Usuarios]
GO
USE [master]
GO
ALTER DATABASE [db_a9b9c2_darkapple55] SET  READ_WRITE 
GO