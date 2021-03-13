import React, {useEffect} from 'react';
import TableTransaction from './TableTransaction';



const Table = ({getTable, transacciones, limite, tipo}) => {
    
    useEffect(() => {
        getTable(limite)
    }, [])
    

    return (
        <table className="table table-striped">
            <thead>
                    <tr>
                        <th scope="col">acción</th>    
                        <th scope="col">concepto</th>
                        <th scope="col">monto</th>
                        <th scope="col">fecha</th>
                        <th scope="col">tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {tipo==="todos" ? 
                    (
                        transacciones.map(transaction =>
                            (
                                <TableTransaction
                                key={transaction.id}
                                transaction={transaction}
                                />
                            )
                            )
                    ):(
                        transacciones.map(transaction =>{
                            if(transaction.tipo===tipo){
                             
                                
                                    return <TableTransaction
                                    key={transaction.id}
                                    transaction={transaction}
                                    />
                                
                            }else{
                                return null
                            }
                        }
                            
                        )

                    )}
                </tbody>
            
        </table>
    );
};

export default Table;