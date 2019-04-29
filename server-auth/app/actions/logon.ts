import {Post} from '../decorators';
import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import {MySQL} from '../mysql/mysql';
import {MySQLFactory} from '../mysql/mysql_factory';

export class LogonAction extends Action{

    private validateData(){
        new KernelUtils().createExceptionApiError('1001', 'Usuário e senha inválidos', this.req.body.userName == '' || this.req.body.password == '');
    }

    private generateSQL() : string {
        return 'select * from usuario where usuario.username = \'' + this.req.body.userName + '\' and usuario.password = \'' + this.req.body.password + '\'';
    }

    private generateSQLGetCidades() : string {
        return 'select * from cidade';
    }

    private generateSQLGetBairro() : string {
        return 'select * from bairro where bairro.cidade_idCidade = ' + this.req.params.idcidade;
    }

    private generateSQLGetTamanho() : string {
        return 'select * from tamanho';
    }

    private generateSQLGetSabores() : string {
        return 'select * from sabor where tamanho_idTamanho = ' + this.req.params.idtamanho;
    }

    private generateSQLCadastrarUsuario() : string {
        return 'INSERT INTO usuario (username, password) values (\'' + this.req.body.userName + '\' , \'' + this.req.body.password + '\')';
    }

    private generateSQLCadastrarSabor() : string {
        return ' insert into sabor (nomeSabor, preco, tamanho_idTamanho) values ( \'' + this.req.body.nomeSabor + '\' ,' + this.req.body.preco + ', ' +  this.req.body.idTamanho + ' ) ';
    }

    private generateSQLGetUsuarios() : string {
        return 'select * from usuario';
    }

    private generateSQLDeletarUsuario() : string {
        return 'delete from usuario where idusuario = ' + this.req.body.idUsuario + ' and username = \'' + this.req.body.userName + '\'';
    }

    private generateSQLAlterarUsuario() : string {
        return 'update usuario ' +        
        ' set password = \'' + this.req.body.password + '\' '+
        ' where idusuario = ' + this.req.body.idusuario +
        '   and username = \'' + this.req.body.userName + '\'';
    }


    @Post('/logon')
    public Post(){        
        this.validateData();

        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (data : any) => {
                if (!data.length || data.length != 1){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Usuário e senha inválidos'));
                  return;
                }
                this.sendAnswer({data});
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    @Post('/cadastro')
    public cadastrarUsuario(){
        new MySQLFactory().getConnection().select(this.generateSQLCadastrarUsuario()).subscribe(
            (data : any) => {
                console.log(data);
                this.sendAnswer(data);
            },
            (error : any) => {
                console.log(error);
                this.sendError(error);
            }
        );
    }

    @Post('/cadastroSabor')
    public cadastrarSabor(){
        new MySQLFactory().getConnection().select(this.generateSQLCadastrarSabor()).subscribe(
            (data : any) => {
                console.log(data);
                this.sendAnswer(data);
            },
            (error : any) => {
                console.log(error);
                this.sendError(error);
            }
        );
    }

    @Post('/delUsuario')
    public deletarUsuario(){
        new MySQLFactory().getConnection().select(this.generateSQLDeletarUsuario()).subscribe(
            (data : any) => {
                console.log(data);
                this.sendAnswer(data);
            },
            (error : any) => {
                console.log(error);
                this.sendError(error);
            }
        );
    }

    @Post('/alterarUsuario')
    public alterarUsuario(){
        new MySQLFactory().getConnection().select(this.generateSQLAlterarUsuario()).subscribe(
            (data : any) => {
                console.log(data);
                this.sendAnswer(data);
            },
            (error : any) => {
                console.log(error);
                this.sendError(error);
            }
        );
    }

    @Get('/cidades')
    public GetCidade(){
        new MySQLFactory().getConnection().select(this.generateSQLGetCidades()).subscribe(
            (data : any) => {
                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    @Get('/bairros/:idcidade')
    public GetBairro(){
        let idcidade = this.req.params.idcidade;
        new MySQLFactory().getConnection().select(this.generateSQLGetBairro()).subscribe(
            (data : any) => {
                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    @Get('/tamanhos')
    public GetTamanho(){
        new MySQLFactory().getConnection().select(this.generateSQLGetTamanho()).subscribe(
            (data : any) => {
                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    @Get('/sabores/:idtamanho')
    public GetSabores(){
        new MySQLFactory().getConnection().select(this.generateSQLGetSabores()).subscribe(
            (data : any) => {
                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    @Get('/usuarios')
    public GetUsuarios(){
        new MySQLFactory().getConnection().select(this.generateSQLGetUsuarios()).subscribe(
            (data : any) => {
                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }
    
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}