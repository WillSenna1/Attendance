# Documentação: Worker para Geração de Relatórios Diários


## Objetivo
O objetivo deste worker é realizar a extração de dados dos bancos de dados da aplicação durante a madrugada (diariamente), processar essas informações e gerar um arquivo de relatório. Após a geração, o arquivo será enviado para uma storage externa, para que outras equipes possam acessá-lo.


## Escopo
Tarefas do Worker:

- Conectar-se aos bancos de dados da aplicação.
- Extrair os dados conforme uma consulta SQL predefinida.
- Processar os dados e gerar o relatório no formato CSV.
- Realizar o upload do arquivo gerado para uma storage externa (ex: AWS S3, Azure Blob Storage).
- Implementar alertas e monitoramento para detectar falhas na execução ou erros de geração/upload.


## Requisitos do Worker
O worker deve ser configurado para rodar automaticamente todos os dias, em um horário fixo, durante a madrugada (por exemplo, 01:00 AM).
O sistema deve ser escalável e capaz de lidar com volumes de dados variáveis.

## Detalhes Técnicos
Acesso ao Banco de Dados:

 - Bancos de Dados: O worker irá extrair dados dos bancos de dados usados pela aplicação principal (informar nomes dos bancos e tabelas exatos).
 Conexão: As credenciais e parâmetros de conexão (host, porta, usuário e senha) deverão ser obtidos de variáveis de ambiente, garantindo a segurança dos dados sensíveis.

Estrutura do Relatório:

  Formato: O relatório será gerado em formato CSV.
  Campos: Abaixo está a lista dos campos obrigatórios que devem estar presentes no relatório:
  ```json
        {
            data_extracao: "Data e hora da extração",
            nome_usuario: "Nome do usuário",
            id_transacao: "Identificador da transação",
            valor_transacao: "Valor da transação",
            status_transacao: "Status da transação"
        }
   ```
  - Observação: As consultas SQL fornecidas devem gerar os campos com esses nomes e formatos.

Período de Execução:
 - O worker deve ser executado diariamente às 01:00 AM (horário do servidor), utilizando um cron job ou agendador de tarefas compatível.



## Processo de Armazenamento
Storage Externa:

  Storage: A storage utilizada será a AWS S3 (ou outra plataforma como Azure Blob Storage, a depender da escolha da equipe).
  Bucket:
   O bucket de destino no S3 será configurado para armazenar os relatórios diários.
   Nome do bucket: bucket-relatorios-aplicacao.

Formato do Arquivo:
    O arquivo gerado deverá seguir o padrão de nomenclatura:
    relatorio_{data_YYYYMMDD}.csv.
    Exemplo: relatorio_20241005.csv.
Segurança:
    Todos os dados enviados ao bucket serão criptografados e o worker deve garantir o uso de políticas de controle de acesso adequadas (usando políticas de IAM).



## Considerações Finais

A implementação deverá ser testada em um ambiente de desenvolvimento antes de ser movida para produção.
Garantir que os dados estão sendo processados e gerados de forma precisa.
O prazo de conclusão para essa tarefa será de 30 dias, com entregas intermediárias para revisão.

