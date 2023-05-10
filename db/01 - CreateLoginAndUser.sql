USE [master]
GO

-- Primero hay que crear la base de datos 'app-reportes'

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE [name] = N'Reportes')
BEGIN
	PRINT 'Creando Login'
	CREATE LOGIN [Reportes] WITH 
		PASSWORD = N'Reportes1234', 
		DEFAULT_DATABASE = [app-reportes], 
		CHECK_EXPIRATION = OFF, 
		CHECK_POLICY = OFF
END
GO

USE [app-reportes]
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE [name] = N'Reportes')
BEGIN
	PRINT 'Creando User'
	CREATE USER [Reportes] FOR LOGIN [Reportes]
	ALTER ROLE [db_owner] ADD MEMBER [Reportes]
END 
GO
