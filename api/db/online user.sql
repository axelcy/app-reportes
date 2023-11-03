USE [master]
GO

-- Primero hay que crear la base de datos 'db_a9b9c2_darkapple55'

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE [name] = N'Reportes')
BEGIN
	PRINT 'Creando Login'
	CREATE LOGIN [Reportes] WITH 
		PASSWORD = N'Reportes1234', 
		DEFAULT_DATABASE = [db_a9b9c2_darkapple55], 
		CHECK_EXPIRATION = OFF, 
		CHECK_POLICY = OFF
END
GO

USE [db_a9b9c2_darkapple55]
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE [name] = N'Reportes')
BEGIN
	PRINT 'Creando User'
	CREATE USER [Reportes] FOR LOGIN [Reportes]
	ALTER ROLE [db_owner] ADD MEMBER [Reportes]
END 
GO
