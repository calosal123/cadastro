import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../servicos/usuario.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  private id: number;
  constructor(private rota: ActivatedRoute, private srv: UsuarioService) {  }

  ngOnInit() {
    this.id = this.rota.snapshot.params["id"]; // esse parametro veio da declaracao no arquivo app-routing.ts
    console.log("Veio como parametro o valor = "+this.id);

    this.srv.recuperaDetalhe(this.id).subscribe((res:Usuario)=>{
      this.usuario = res;
      console.log("recuperado!");
      console.log(this.usuario);
    });
  }

  enviarAlteracoes(){
     this.srv.atualiza(this.usuario).subscribe(
     (res)=>{
       console.log("Atualizado com sucesso");
     },
     (err)=>{
       console.log("Erro ao atualizar");
       console.log(err);
     });
  }

}
