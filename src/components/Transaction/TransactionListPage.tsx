import { Route } from "../../routes/clients/$clientId/accounts/$accountId/transactions/route";
import TransactionList from "./TransactionList";

export default function TransactionListPage() {
  const { clientId, accountId } = Route.useParams<{
    clientId: string;
    accountId: string;
  }>();
  const cid = Number(clientId);
  const aid = Number(accountId);

  return <TransactionList clientId={cid} accountId={aid} />;
}
