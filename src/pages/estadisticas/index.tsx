import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import { LayoutContent } from "~/components/Layout";
import { verifySession } from "~/utils/verifySession";

const EstadisticasPage = () => {
  return (
    <LayoutContent>
      <div className="container">
        <h1>Estadisticas de cajas</h1>

        <Table className="h-auto min-w-full">
          <TableHeader>
            <TableColumn>MANZANA</TableColumn>
            <TableColumn>CASAS</TableColumn>
            <TableColumn>FAMILIA</TableColumn>
            <TableColumn>NO CARNET</TableColumn>
            <TableColumn>UNIFAMILIAR</TableColumn>
            <TableColumn>EXTRA</TableColumn>
            <TableColumn>BIFAMILIAR</TableColumn>
            <TableColumn>ENTREGADA</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </LayoutContent>
  );
};

export default EstadisticasPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await verifySession(context);
}
