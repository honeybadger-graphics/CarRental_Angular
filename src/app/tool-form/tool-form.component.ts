import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToolDTO } from '../../../models';
import { ToolService } from '../services/tool.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tool-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tool-form.component.html',
  styleUrl: './tool-form.component.css'
})
export class ToolFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  toolService = inject(ToolService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  toolForm = this.formBuilder.group<ToolDTO>({
    id: 0,
    toolId: "",
    toolBrand: "",
    toolName: "",
    toolType: "",
    toolPower: 0,
    toolWeight: 0,
    toolDeposit: 0,
    toolDailyCost: 0,
  });

  isNewTool = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];

    if (id) {
      this.isNewTool = false;
      this.toolService.getOne(id).subscribe({
        next: (tool) => this.toolForm.setValue(tool),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveTool() {
    const tool = this.toolForm.value as ToolDTO;

    if (this.isNewTool) {
      this.toolService.create(tool).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/list-tools');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.toolService.update(tool).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/list-tools');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    
  }
}
