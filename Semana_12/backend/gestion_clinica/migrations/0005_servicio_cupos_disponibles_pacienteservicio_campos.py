# Generated for Laboratorio 07 - ORM avanzado
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_clinica', '0004_cita'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicio',
            name='cupos_disponibles',
            field=models.PositiveIntegerField(default=50),
        ),
        migrations.AddField(
            model_name='pacienteservicio',
            name='cantidad',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='pacienteservicio',
            name='monto',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='pacienteservicio',
            name='estado',
            field=models.CharField(
                choices=[
                    ('PENDIENTE', 'Pendiente'),
                    ('PAGADO', 'Pagado'),
                    ('DEVUELTO', 'Devuelto'),
                ],
                default='PENDIENTE',
                max_length=20,
            ),
        ),
    ]
