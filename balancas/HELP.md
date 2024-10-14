# Placa Balanca:: NANONET_20241010

Instruções de ligação e configuração de placas para cancela firmware **NANONET_20241010**. Desenvolvido e fornecido por **BRTRONIC - Rodrigo Daniel Zacarias ME**.

# Comand list
### Setup:
```
SIL => ip do dispositivo. Ex 192.168.1.240
SIS => ip do servidor. Ex.: 192.168.20.211
SIA => MacAddress byteArray. Ex.: 222.173.190.239.222.240 [ DE:AD:BE:EF:DE:x ]
SW  => WebAuth. 0: Disable; 1: Enable
```

### Usage:
```
SS.GREEN => SET LIGHTS (GREEN:ON, RED:OFF)
SS.RED   => SET LIGHTS (GREEN:OFF, RED:ON)

SSGON    => LIGHTS "GREEN"   : ON
SSGOFF   => LIGHTS "GREEN"   : OFF
SSGP     => LIGHTS "GREEN"   : FLASHING

SSRON    => LIGHTS "RED"     : ON
SSROFF   => LIGHTS "RED"     : OFF
SSRP     => LIGHTS "RED"     : FLASHING

SLF      => *RESERVADO
SLW      => SET LCD WRITE    : ESCREVE
SLX      => SET LCD X        : RESET
SLON     => SET LCD ON       : LIGA
SLOFF    => SET LCD OFF      : DESLIGA

GS		 => GET STATUS IOs	: Returns BINARY
GL		 => GET STATUS LCD	: Returns ON|OFF

```

### Manutenção
Imprime mudança de status das IOs durante os proximos 60 segundos. Disponivel para manutenção, e testes de acionamento dos sensores.
```
ST     => SET TESTE
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
6: GREEN         1=ON, 0=OFF
5: RED           1=ON, 0=OFF
4: P3(SENSOR 3)  1=Standby, 0=Acionado
3: P2(SENSOR 2)  1=Standby, 0=Acionado
2: P1(SENSOR 1)  1=Standby, 0=Acionado
1: FC            1=Standby, 0=Acionado
0: AB            1=Standby, 0=Acionado
```