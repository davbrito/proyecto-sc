import { Card, CardBody, CardHeader, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { api } from "~/utils/api"
import { CustomLoading } from "../Loading"
import { ErrorMessage } from "../ErrorMessage"
import Link from "next/link"
import { formatDate, getRelativeTime } from "~/utils/dates"
import { divide } from "lodash"

interface Prop {
    casaId: number
}
const CasaInfor = ({ casaId }: Prop) => {
    const { data, isLoading } = api.casa.getByCasaId.useQuery({ id: casaId })
    if (isLoading) return <CustomLoading />;

    if (!data)
        return (
            <div className="container mx-auto">
                <ErrorMessage
                    title="Error al recuperar la informacion de la casa."
                    body="Revise su conexion de internet, e intente nuevamente."
                />
            </div>
        );

    return (<div className="container mx-auto flex flex-col  py-4">
        <Card>
            <CardHeader className="flex flex-col gap-3">
                <div className="mx-auto flex items-center justify-center  space-x-2 px-2 font-semibold leading-8">
                    <h2 className="text-3xl  font-normal text-gray-400">
                        Informacion de la casa
                    </h2>
                </div>
                <div className="grid  grid-cols-1 gap-1  lg:grid-cols-2  lg:text-base">
                    <div className="grid grid-cols-2 gap-3  border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Calle:</div>
                        <div className="text-right uppercase">{data.calle}</div>
                    </div>
                    <div className="grid  grid-cols-2 gap-3  border-gray-500  px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Manzana:</div>
                        <div className="text-right uppercase">{data.manzana}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3  border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Casa:</div>
                        <div className="text-right uppercase">{data.casa}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3  border-gray-500   px-3 py-2 lg:gap-0 lg:border-solid">
                        <div className=" font-semibold">Nro Residentes:</div>
                        <div className="text-right uppercase">{data.jefeFamilia.reduce((prev, current) => prev + current.censo.cargaFamiliar, 0)}</div>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <Table className="mt-2 h-auto min-w-full text-center">
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
                            Carga Familiar
                        </TableColumn>
                        <TableColumn align="center" className="text-center">
                            Genero
                        </TableColumn>
                        <TableColumn align="center" className="text-center">
                            Estado
                        </TableColumn>
                        <TableColumn align="center" className="text-center">
                            Acciones
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data.jefeFamilia.map(({ id, apellidos, nombres, censo, tipoDocumento, numeroDocumento, fechaNacimiento, genero }) => (
                            <TableRow key={id} className="border-b-2">
                                <TableCell className="text-center text-sm">
                                    <Link
                                        href={`/consejo-comunal/${censo.consejoComunalId}/censo/${String(id)}`}
                                        className="font-semibold text-blue-600 transition-all hover:text-gray-600 "
                                    >
                                        {tipoDocumento.toUpperCase()}-
                                        {numeroDocumento}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {data.manzana}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {data.casa.padStart(2, "0")}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {apellidos.toUpperCase()},{" "}
                                    {nombres.toUpperCase()}.
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {tipoDocumento.toUpperCase()}-
                                    {numeroDocumento}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {formatDate(fechaNacimiento)}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {getRelativeTime(fechaNacimiento)}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {censo.cargaFamiliar}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    {genero.toUpperCase() === "F"
                                        ? "Femenino"
                                        : "Masculino"}
                                </TableCell>
                                <TableCell className="text-center text-sm">
                                    <Chip color={censo.datos_validado ? "success" : "danger"}>
                                        {censo.datos_validado ? "Validado" : "Por validar"}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/consejo-comunal/${censo.consejoComunalId}/censo/${String(id)}`}
                                        className="block rounded-xl bg-blue-700 px-3 py-2 text-[0.875rem]  text-white transition-all hover:bg-blue-950"
                                    >
                                        Ver jefe
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </CardBody>
        </Card>
    </div>)
}

export default CasaInfor