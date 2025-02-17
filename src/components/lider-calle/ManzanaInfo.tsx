import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import Link from "next/link"
import { api } from "~/utils/api"
import { formatDate, getRelativeTime } from "~/utils/dates"
import { ErrorMessage } from "../ErrorMessage"
import { CustomLoading } from "../Loading"

interface Props {
    liderId: number
}
const ManzanaInfo = ({ liderId }: Props) => {
    const { data, isLoading, error } = api.lider.getByManzana.useQuery({
        id: liderId
    })

    if (isLoading) return <CustomLoading />;

    if (!data)
        return (
            <div className="container mx-auto">
                <ErrorMessage
                    title="Error al recuperar la informacion del jefe de familia."
                    body="Revise su conexion de internet, e intente nuevamente."
                />
            </div>
        );

    const totalCombos =
        data.censados &&
        data.censados.reduce(
            (prev, current) => {
                const prevCajasClaps = prev ? prev.cajasClaps : 0;
                if (!current.datos_validado) return { cajasClaps: prevCajasClaps }
                const currentCajasClaps = current ? current.cajasClapsPorRecibir : 0;
                return { cajasClaps: prevCajasClaps + currentCajasClaps };
            },
            { cajasClaps: 0 }
        ).cajasClaps;
    console.log(totalCombos)

    return (<div className="container mx-auto flex flex-col gap-4 py-4">
        <Card>
            <CardHeader>
                <div className="mx-auto flex items-center justify-center  space-x-2 px-2 font-semibold leading-8">
                    <h2 className="text-2xl  font-normal text-gray-400">
                        Lider de la Manzana #{data.lider.manzana}
                    </h2>
                </div>
            </CardHeader>
            <CardBody>
                <div className="grid  grid-cols-1 gap-1  lg:grid-cols-2  lg:text-base">
                    <div className="grid grid-cols-2 gap-3  border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Nombres:</div>
                        <div className="text-right uppercase">{data.lider.jefeFamilia.nombres}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3  border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Apellidos:</div>
                        <div className="text-right uppercase">{data.lider.jefeFamilia.apellidos}</div>
                    </div>
                    <div className="grid  grid-cols-2 gap-3  border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Cedula identidad:</div>
                        <div className="text-right uppercase">{data.lider.jefeFamilia.tipoDocumento}-{data.lider.jefeFamilia.numeroDocumento}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3  border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Numero de contacto:</div>
                        <div className="text-right capitalize">{data.lider.jefeFamilia.telefono}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3  border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Email:</div>
                        <div className="font-medium text-blue-700 text-right">{data.lider.jefeFamilia.email}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 px-3 py-2">
                        <div className=" font-semibold">Fecha nacimiento:</div>
                        <div className="text-right">{formatDate(data.lider.jefeFamilia.fechaNacimiento)}</div>
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex flex-col gap-4 overflow-x-auto w-full">
                    <div className="mx-auto flex items-center justify-center  space-x-2 px-2 font-semibold leading-8">
                        <h2 className="text-2xl  font-normal text-gray-400">
                            Censados Manzana #{data.lider.manzana}
                        </h2>
                    </div>

                    <Table shadow={"none"}>
                        <TableHeader>
                            <TableColumn align="center" className="text-center">
                                Codigo
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Manzana
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Casa
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Nombres
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Documento
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Fecha Nacimiento
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Edad
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Familia
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Combos
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Estado
                            </TableColumn>
                            <TableColumn align="center" className="text-center">
                                Acciones
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {data?.censados.map(({ jefeFamilia, id, tipoFamilia, datos_validado, cajasClapsPorRecibir }) => (
                                <TableRow key={id} className="border-b-2">
                                    <TableCell className="text-center text-sm">
                                        <Link
                                            href={
                                                !jefeFamilia
                                                    ? ""
                                                    : `/consejo-comunal/${data.lider.consejoComunalId}/censo/${String(
                                                        jefeFamilia.id
                                                    )}`
                                            }
                                            className="font-semibold text-blue-600 transition-all hover:text-gray-600 "
                                        >
                                            {jefeFamilia?.tipoDocumento.toUpperCase()}-
                                            {jefeFamilia?.numeroDocumento}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {jefeFamilia?.casa ? jefeFamilia.casa.manzana : ""}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {jefeFamilia?.casa
                                            ? jefeFamilia.casa.casa.padStart(2, "0")
                                            : ""}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {jefeFamilia?.apellidos.toUpperCase()},{" "}
                                        {jefeFamilia?.nombres.toUpperCase()}.
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {jefeFamilia?.tipoDocumento.toUpperCase()}-
                                        {jefeFamilia?.numeroDocumento}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {formatDate(jefeFamilia?.fechaNacimiento as Date)}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {getRelativeTime(jefeFamilia?.fechaNacimiento as Date)}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {tipoFamilia.toUpperCase()}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {cajasClapsPorRecibir}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        <Chip color={datos_validado ? "success" : "danger"}>
                                            {datos_validado ? "Validado" : "Por validar"}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className="mx-auto bg-blue-700 text-white transition-all hover:bg-blue-900"
                                            size="sm"
                                            onPress={() => {
                                                const id = jefeFamilia?.id;
                                                if (!id) return;
                                                // setOpenModal({ isOpen: true, id });
                                                // onOpen();
                                            }}
                                        >
                                            Agregar pariente
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    <div className="mt-2 text-center">
                        <h4 className="mx-auto font-normal">
                            TOTAL COMBOS: <span className="font-bold">{totalCombos}</span>
                        </h4>
                    </div>
                </div>

            </CardFooter>
        </Card>





    </div>)
}

export default ManzanaInfo