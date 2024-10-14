# Placa Cancela :: V8_rev1_Olfar

Instruções de ligação e configuração de placas para cancela firmware **V8_rev1_olfar**. Desenvolvido e fornecido por **BRTRONIC - Rodrigo Daniel Zacarias ME**.

Comand list:
```
SIL => ip do dispositivo. Ex 192.168.1.240
SIS => ip do servidor. Ex.: 192.168.20.211
SIA => MacAddress byteArray. Ex.: 222.173.190.239.222.240 [ DE:AD:BE:EF:DE:x ]
SM => Modus: 1. Pulsador; 2. Portaria
SC => Tempo Max Motor. Padrao: 60
SD => Delay Fechamento. Padrao: 1
SF => Tempo Confirmação sensor. Multiplo de 100 millis. Ex.: 25 = 2,5 segundos; 30 = 3 segundos
SW => WebAuth. 0: Disable; 1: Enable

SM => Modus 1: (Pulsador)
Entrada P1 => Pulso Abre
Entrada P2 => Pulso Fecha
Entrada P3 => Sensor Anti esmagamento
```

## GS: Get Status IOs
Retorna o status de todas IOs em formato binario

```
GS = 1 byte, 8 bits
returns "11111111"
```
**enderecamento:** `[ 7, 6, 5, 4, 3, 2, 1, 0 ]` 

**legenda:** 
```
7: *Reservado
6: Motor 1=Fechando, 0=Standby
5: Motor 1=Abrindo, 0=Standby
4: P3(Antiesmagamento) 1=Standby, 0=Acionado
3: P2(Pulso Fecha) 1=Standby, 0=Acionado
2: P1(Pulso Abre) 1=Standby, 0=Acionado
1: FC(Sensor Fechamento) 1=Standby, 0=Aberto
0: AB(Sensor Abertura) 1=Standby, 0=Fechado
```