USE [Municipio.Hurlingham]
GO
/****** Object:  StoredProcedure [dbo].[SINC_Tareas_S]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_Tareas_S]
GO
/****** Object:  StoredProcedure [dbo].[SINC_Tareas_IU]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_Tareas_IU]
GO
/****** Object:  StoredProcedure [dbo].[SINC_ReunionesDiarias_S]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_ReunionesDiarias_S]
GO
/****** Object:  StoredProcedure [dbo].[SINC_ReunionesDiarias_IU]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_ReunionesDiarias_IU]
GO
/****** Object:  StoredProcedure [dbo].[SINC_ReunionesDiarias_carga_S]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_ReunionesDiarias_carga_S]
GO
/****** Object:  StoredProcedure [dbo].[SINC_Proyectos_S]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_Proyectos_S]
GO
/****** Object:  StoredProcedure [dbo].[SINC_Proyectos_IU]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_Proyectos_IU]
GO
/****** Object:  StoredProcedure [dbo].[SINC_Problemas_S]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_Problemas_S]
GO
/****** Object:  StoredProcedure [dbo].[SINC_Problemas_IU]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_Problemas_IU]
GO
/****** Object:  StoredProcedure [dbo].[SINC_login]    Script Date: 28/12/2021 11:16:23 ******/
DROP PROCEDURE [dbo].[SINC_login]
GO
/****** Object:  StoredProcedure [dbo].[SINC_login]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SINC_login](
	@cuenta varchar(50),
	@password varchar(50),
	@ip varchar(20),
	@userAgent varchar(500),
	@modulo varchar(20)='SINC')
as
	declare @cdUsuario int
	declare @cdUserAgent int
	declare @cdSesion int
	declare @cdSistema int

	select @cdSistema=cdSistema 
	 from CFG_Sistemas 
	 where dsPrefijo=@modulo

	select @cdUsuario=u.cdUsuario
	 from Usuarios u
	 left join CFG_UsuariosPerfiles up
	 on up.cdUsuario=u.cdUsuario
	 left join CFG_Perfiles p
	 on up.cdPerfil=p.cdPerfil
	 where dsLogin=@cuenta
	 and upper(dsContraseña)=upper(@password)
	 and icEstado=1;

	if @cdUsuario is null 
		begin
			insert CFG_log (cdSesion,dsProcedimiento,dsDocumento)
			values (null,@modulo + ':login', (select @cuenta as usuario,@ip as ip,@userAgent as userAgent for JSON path ));

			select 1 as isException, 1 as error, 'El usuario y/o la contraseña son incorrectos, o no tiene permisos de acceso al modulo ' + @modulo as mensaje for json path;
			return
		end


	select @cdUserAgent=cdUserAgent
	 from CFG_userAgent
	 where dsUserAgent=@userAgent;
 
	if @cdUserAgent is null
		begin
			insert CFG_userAgent (dsUserAgent) values (@userAgent)
			select @cdUserAgent = @@IDENTITY;
		end

	insert CFG_Sesiones (cdUsuario,cdSistema,cdUserAgent,dsIP,dsSesion,dtInicio,dtUltimoAcceso)
	values (@cdUsuario,@cdSistema,@cdUserAgent,@IP,'',dateadd(HH,-3,getutcdate()),dateadd(HH,-3,getutcdate()));

	set @cdSesion=@@IDENTITY;


	--Escalar Azure
/*	 declare @dtScale datetime
	 declare @dsScale varchar(20)

	 select top 1 @dtScale=dtAzureScale,
	 @dsScale=dsEscala
	 from AzureScales
		order by cdAzureScale desc


	declare @escala varchar(20)

	select @escala=isnull(dsDato,'S1')
	 from AppData
	 where dsNombre='AzureScale'
 
	 if isnull(@dsScale,'Basic') ='Basic'
		begin
			insert AzureScales (dsEscala) values (@escala);
			Execute AzureDbScale @escala;
		end
		*/


	select uiSesion as sesion,
	 u.cdUsuario as usuario,
	 u.dsNombre as nombre,
		 u.dsApellido as apellido,
		 u.dsLogin as login,
		 u.dsEmail as email,
		 u.dsCelular as celular,
		 p.dsRoles as roles,
		 isnull(u.cdAvatar,1) as av,
		 (select p2.cdPerfil as id,
		         p2.dsPerfil as nombre
		    from CFG_Perfiles p2 
		    where p2.icBorrado=0 
			  and p2.cdSistema=@cdSistema 
			  for json path) as perfiles,
		 u.icEstado as estado
	 from CFG_Sesiones s
	 left join CFG_Usuarios u
	 on s.cdUsuario=u.cdUsuario
	 left join CFG_UsuariosPerfiles up
	 on up.cdUsuario=u.cdUsuario
	 left join CFG_Perfiles p
	 on up.cdPerfil=p.cdPerfil 
	where cdSesion=@cdSesion
	  and p.cdSistema=@cdSistema
	 for json path;

	 insert CFG_log (cdSesion,dsProcedimiento,dsDocumento)
	 values (@cdSesion,@modulo + ':login', (select @cuenta as usuario,
	                                               @ip as ip,
												   @cdUserAgent as userAgent 
											   for JSON path ));
GO
/****** Object:  StoredProcedure [dbo].[SINC_Problemas_IU]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SINC_Problemas_IU]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdProblema int 

	 select @cdProblema = cdProblema
	   from openjson(@jsParametro)
	   with (cdProblema int '$.id')

	   if @cdProblema is null
		begin 
			insert SINC_Problemas(cdReunion,cdUsuario,dsProblema)
			select cdReunion,cdUsuario,dsProblema
			  from openjson(@jsParametro)
			  with (cdReunion int '$.r',
			        cdUsuario int '$.u',
					dsProblema nvarchar(1000) '$.d')

			select @cdProblema =@@IDENTITY
		end
	else
		begin
			update SINC_Problemas 
			   set cdReunion=j.cdReunion,
			       cdUsuario=j.cdUsuario,
				   dsProblema=j.dsProblema
			from openjson(@jsParametro)
			  with (cdReunion int '$.r',
			        cdUsuario int '$.u',
					dsProblema nvarchar(1000) '$.d') j
		  	 where cdProblema=@cdProblema;
		end

	select @cdProblema as id for json path	
end
GO
/****** Object:  StoredProcedure [dbo].[SINC_Problemas_S]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create procedure [dbo].[SINC_Problemas_S]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdUsuariop int
	declare @cdReunion int
	declare @cdProblema int

	 select @cdProblema=cdProblema,
			@cdUsuariop=cdUsuario,
			@cdReunion=cdReunion
	   from openjson(@jsParametro)
	   with (cdProblema	 int '$.id',
			 cdUsuario  int '$.u',
			 cdReunion  int '$.r'
			 )
 
	     select (
		     SELECT 
				  cdProblema as id
				  ,cdReunion as r
				  ,cdUsuario as u
				  ,dsProblema as d
			  FROM [dbo].[SINC_Problemas] as p
		     where (p.cdUsuario=@cdUsuariop or @cdUsuariop is null)
			   and (p.cdProblema=@cdProblema or @cdProblema is null)
			   for json path) as proyectos
end
GO
/****** Object:  StoredProcedure [dbo].[SINC_Proyectos_IU]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SINC_Proyectos_IU]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdProyecto int

	 select @cdProyecto=cdProyecto
	   from openjson(@jsParametro)
	   with (cdProyecto int '$.id')
 
if @cdProyecto is null
		begin 
			insert SINC_Proyectos(dsProyecto,dsDescripcion,cdEstado)
			select dsProyecto,dsDescripcion,cdEstado
			  from openjson(@jsParametro)
			  with (dsProyecto nvarchar(100) '$.n',
			        dsDescripcion nvarchar(max) '$.d',
					cdEstado int '$.e')
			select @cdProyecto=@@IDENTITY
		end
	else
		begin
			update SINC_Proyectos
			   set dsProyecto=j.dsProyecto,
			       dsDescripcion=j.dsDescripcion,
				   cdEstado=j.cdEstado
			from openjson(@jsParametro)
			  with (dsProyecto nvarchar(100) '$.n',
			        dsDescripcion nvarchar(max) '$.d',
					cdEstado int '$.e') j
		  	 where cdProyecto=@cdProyecto;
		end
	select @cdProyecto as id for json path	
end
GO
/****** Object:  StoredProcedure [dbo].[SINC_Proyectos_S]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SINC_Proyectos_S]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdProyecto int
	declare @cdEstado bit

	 select @cdProyecto=cdProyecto,
	        @cdEstado=cdEstado
	   from openjson(@jsParametro)
	   with (cdProyecto int '$.id',
	         cdEstado bit '$.e')
 
     select (select p.cdProyecto as id,
				    p.dsProyecto as n,
				    p.dsDescripcion as d,
				    p.cdEstado as e
	          from SINC_Proyectos p
		     where (p.cdProyecto=@cdProyecto or @cdProyecto is null)
			   and (p.cdEstado=@cdEstado or @cdEstado is null)
			   for json path) as proyectos
end
GO
/****** Object:  StoredProcedure [dbo].[SINC_ReunionesDiarias_carga_S]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SINC_ReunionesDiarias_carga_S]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdReunion int 
	declare @cdProyecto int 

	 select @cdReunion = cdReunion,
	        @cdProyecto = cdProyecto 
	   from openjson(@jsParametro)
	   with (cdReunion int '$.id',
			 cdProyecto int '$.p')

select T.cdTarea as id,
			   T.cdEstado as e,
			   T.dsTarea as d 
		  from SINC_Tareas T 
		 where @cdProyecto=t.cdProyecto 
		   and t.cdEstado in (1,2) for json path
end
GO
/****** Object:  StoredProcedure [dbo].[SINC_ReunionesDiarias_IU]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SINC_ReunionesDiarias_IU]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdReunion int 
	declare @cdUsuarioReunion int
	declare @cdProyecto int
	declare @dtReunion date

	 select @cdReunion=cdReunion,
	        @cdUsuarioReunion=cdUsuarioReunion,
			@cdProyecto=cdProyecto,
			@dtReunion=dtReunion
	   from openjson(@jsParametro)
	   with (cdReunion int '$.id',
	         cdUsuarioReunion int '$.u',
			 cdProyecto int '$.p',
			 dtReunion date '$.dt')


	if @cdReunion is null and @cdProyecto is not null
		select @cdReunion=max(cdReunion) 
		  from SINC_ReunionesDiarias
		 where cdProyecto=@cdProyecto
		   and dtReunion=@dtReunion
	

	   if @cdReunion is null
		begin 
			insert SINC_ReunionesDiarias(dtReunion,cdProyecto,dtRealizacion)
			select dtReunion,cdProyecto,dtRealizacion
			  from openjson(@jsParametro)
			  with (dtReunion date '$.dt',
			        cdProyecto int '$.p',
					dtRealizacion datetime '$.dtr')

			select @cdReunion =@@IDENTITY
		end
	else
		begin
			update SINC_ReunionesDiarias 
			   set dtReunion=j.dtReunion,
			       cdProyecto=j.cdProyecto,
				   dtRealizacion=j.dtRealizacion
			  from openjson(@jsParametro)
			  with (dtReunion date '$.dt',
			        cdProyecto int '$.p',
					dtRealizacion datetime '$.dtr') j
		  	 where cdReunion=@cdReunion;
		end

	delete SINC_TareasHoy
	 where cdReunion=@cdReunion
	   and cdUsuario=@cdUsuarioReunion

	delete SINC_TareasAyer
	 where cdReunion=@cdReunion
	   and cdUsuario=@cdUsuarioReunion

	delete SINC_Problemas
	 where cdReunion=@cdReunion
	   and cdUsuario=@cdUsuarioReunion
    
	insert SINC_TareasHoy (cdReunion,cdTarea,cdUsuario,cdEstado)
	select @cdReunion,cdTarea,cdUsuario,cdEstado  
	  from openjson(@jsParametro , '$.TareasHoy')
	  with (cdtarea int '$.id',
		   cdUsuario int '$.u',
		   cdEstado int '$.e');

    insert SINC_TareasAyer (cdReunion,cdTarea,cdUsuario,cdEstado)
	select @cdReunion,cdTarea,cdUsuario,cdEstado  
	  from openjson(@jsParametro , '$.TareasAyer')
	  with (cdtarea int '$.id',
		    cdUsuario int '$.u',
		    cdEstado int '$.e');

	 insert SINC_Problemas (cdReunion,cdUsuario,dsProblema)
	 select @cdReunion,cdUsuario,dsProblema  
	   from openjson(@jsParametro , '$.Problemas')
	   with (cdUsuario int '$.u',
			dsProblema nvarchar(1000) '$.desc');

	select @cdReunion as id for json path	
end

GO
/****** Object:  StoredProcedure [dbo].[SINC_ReunionesDiarias_S]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SINC_ReunionesDiarias_S]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdReunion int 
	declare @cdProyecto int 

	 select @cdReunion = cdReunion,
	 @cdProyecto = cdProyecto 
	   from openjson(@jsParametro)
	   with (cdReunion int '$.id',
			 cdProyecto int '$.p')

		select  SRD.cdProyecto as p ,
		        SRD.cdReunion as id ,
		        SRD.dtReunion as dt,
		        SRD.dtRealizacion as dtr,
				(select TA.cdTarea as id,
						TA.cdUsuario as u,
						T.cdEstado as e,
						T.dsTarea as d
					from SINC_TareasAyer TA
					left join SINC_Tareas T
						on T.cdTarea=TA.cdTarea
					where TA.cdReunion=SRD.cdReunion 
					  and @cdProyecto is null for json path) AS TareasAyer,	
				(select TH.cdTarea as id,
						TH.cdUsuario AS u,
						T.cdEstado as e,
						T.dsTarea as d 
					from SINC_TareasHoy TH
					left join SINC_Tareas T 
						on T.cdTarea=TH.cdTarea
					where TH.cdReunion=SRD.cdReunion 
					  and @cdProyecto is null for json path ) AS Tareashoy,
				(select T.cdTarea as id,
						T.cdEstado as e,
						T.dsTarea as d 
					from SINC_Tareas T 
					where @cdReunion=-1 and t.cdEstado in (1,2) for json path) AS TareasPedientes,
					
				(select cdProblema as id, 
						cdUsuario as u,
						dsProblema as d 
					from SINC_Problemas
			where cdReunion=SRD.cdReunion 
			  and @cdProyecto is null for json path)  as Problemas 
	from SINC_ReunionesDiarias SRD 
	where (cdReunion=@cdReunion or cdReunion is null)
		and (cdProyecto= @cdProyecto or cdProyecto is null)
		for json path 

end
GO
/****** Object:  StoredProcedure [dbo].[SINC_Tareas_IU]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[SINC_Tareas_IU]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdTarea int 

	 select @cdTarea = cdTarea
	   from openjson(@jsParametro)
	   with (cdTarea	 int '$.id')
	   if @cdTarea is null
		begin 
			insert SINC_Tareas (cdProyecto,dsTarea,cdEstado)
			select cdProyecto,dsTarea,cdEstado
			  from openjson(@jsParametro)
			  with (cdProyecto int '$.p',
			        dsTarea nvarchar(1000) '$.d',
					cdEstado int '$.e')
			select @cdTarea=@@IDENTITY
		end
	else
		begin
			update SINC_Tareas 
			   set cdProyecto=j.cdProyecto,
			       dsTarea=j.dsTarea,
				   cdEstado=j.cdEstado
			from openjson(@jsParametro)
			  with (cdProyecto int '$.p',
			        dsTarea nvarchar(1000) '$.d',
					cdEstado int '$.e') j
		  	 where cdTarea=@cdTarea;
		end
	select @cdTarea as id for json path	

end
GO
/****** Object:  StoredProcedure [dbo].[SINC_Tareas_S]    Script Date: 28/12/2021 11:16:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SINC_Tareas_S]
@jsParametro nvarchar(max),
@ip varchar(20),
@userAgent varchar(max),
@uiSesion varchar(100)
as

declare @rol varchar(200)='SINC_ADM';
declare @id int
declare @resultado varchar(max)
declare @procId varchar(100)
declare @cdSesion int
declare @dsLogin varchar(50)
declare @dsPerfil varchar(50)
declare @cdUsuario int
declare @err_mensaje varchar(200)
declare @err_error int

set @procId=OBJECT_NAME(@@PROCID)
 
EXECUTE CFG_sesiones_s @uiSesion,@userAgent,@ip,@procId,@jsParametro,@resultado OUTPUT,@rol
 
select @cdSesion = cdSesion,
       @dsLogin = dsLogin,
	   @dsPerfil = dsPerfil,
	   @cdUsuario=cdUsuario,
	   @err_mensaje=mensaje,
	   @err_error=error
  from OPENJSON(@resultado)
  with (cdSesion int '$.cdSesion',
        dsLogin varchar(100) '$.dsLogin',
		dsPerfil varchar(100) '$.dsPerfil',
		cdUsuario int '$.cdUsuario',
		mensaje varchar(200) '$.mensaje',
		error varchar(200) '$.error')

if @cdSesion is null 
	raiserror(@err_mensaje,16,@err_error)
else 
begin 

	declare @cdProyecto int
	declare @cdTarea int 

	 select @cdTarea = cdTarea,
			@cdProyecto=cdProyecto
	   from openjson(@jsParametro)
	   with (cdTarea	 int '$.id',
			 cdProyecto  int '$.p'
			 )
 
	     select (
		     SELECT 
				   [cdTarea] as id
				  ,[dsTarea] as d
				  ,[cdEstado] as e
			  FROM [dbo].[SINC_Tareas] as t
		     where (t.cdProyecto=@cdProyecto or @cdProyecto is null)
			   and (t.cdTarea=@cdTarea or @cdTarea is null)
			   for json path) as proyectos
end
GO
