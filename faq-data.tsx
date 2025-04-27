export const accordionItems = [
    {
        title: 'Que horário recebo o e-mail com a liturgia diária?',
        content: 'Enviamos o e-mail com a liturgia diária todos os dias às 6 da manhã. Caso haja alguma atualização na liturgia, o e-mail será enviado assim que as alterações forem realizadas.',
    },
    {
        title: 'Efetuei o pagamento, mas a assinatura não aparece. O que fazer?',
        content: (
            <>
                Caso você tenha efetuado o pagamento e a assinatura não tenha sido ativada, recomendamos que você verifique os seguintes pontos:
                <ul className="list-disc pl-5 mt-2">
                    <li>Confirme se o pagamento foi processado com sucesso em seu método de pagamento.</li>
                    <li>Verifique se você está utilizando a mesma conta que realizou a assinatura.</li>
                    <li>Entre em contato com nosso suporte, fornecendo o comprovante de pagamento para que possamos ajudá-lo.</li>
                </ul>
            </>
        ),
    },
    {
        title: 'Quais são os meios de pagamento aceitos?',
        content: 'Atualmente, aceitamos apenas pagamentos realizados com cartão de crédito. Certifique-se de que seu cartão está habilitado para compras online e possui saldo disponível.',
    },
    {
        title: 'Cancelei minha assinatura, mas ainda estou recebendo e-mails. Por quê?',
        content: 'Ao cancelar sua assinatura, os e-mails continuarão sendo enviados até o término do período já pago do seu plano. Após esse período, os envios serão automaticamente interrompidos.',
    },
    {
        title: 'Tenho outras dúvidas. Como posso entrar em contato?',
        content: (
            <>
              Caso você tenha outras dúvidas que não foram respondidas aqui, sinta-se à vontade para entrar em contato conosco através do e-mail{' '}
              <a href="mailto:joaocansii@gmail.com" className="text-blue-600 underline">joaocansii@gmail.com</a>. Estamos à disposição para ajudar!
            </>
        ),
    },
];
  
  