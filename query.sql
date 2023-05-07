-- get edificios
select * from Edificios

-- get pisos from edificio
select p.* from Pisos p
inner join Edificios_Pisos ep on ep.Id_Piso = p.Id
where ep.Id_Edificio = 1

-- get aulas from piso
select a.* from Aulas a
inner join Pisos_Aulas pa on pa.Id_Aula = a.Id
where pa.Id_Aula = 1

-- get incidentes from edificio 
select i.id, i.Descripcion, i.Fecha, i.Nivel, e.Id as 'E_Id', e.Descripcion as 'E_Descripcion' from Incidentes i
inner join Pisos_Aulas pa on pa.Id = i.Id_Piso_Aula
inner join Edificios_Pisos ep on ep.Id = pa.Id_Piso_Edificio -- (cambiar a: Id_Edificio_Piso)
inner join Edificios e on e.Id = ep.Id_Edificio

-- get user by id
select * from Usuarios
where Id = 1

-- get user by name
select * from Usuarios
where Nombre like '%input%'

-- get incidentes by user
select * from Incidentes
where Id_Usuario = 1

-- get incidentes order by date (desc, asc parametro)
select * from Incidentes
order by Fecha asc